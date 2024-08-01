use axum::{
    extract,
    http::{
        header::{AUTHORIZATION, CONTENT_TYPE},
        HeaderMap, HeaderName, HeaderValue, Method, Request,
    },
    middleware::{self, Next},
    response::Response,
    routing::{delete, get, patch},
    Json, Router, Server,
};
use chrono::Utc;
use db::connect_to_database;
use error::ApiError;
use jsonwebtoken::{decode, Algorithm, DecodingKey, TokenData, Validation};
use postgrest::Postgrest;
use routes::{delete_user::delete_user, get_month::get_month, update_day::update_day};
use serde::{Deserialize, Serialize};
use std::{env, net::SocketAddr, sync::Arc};
use tokio::sync::Mutex;
use tower_http::cors::CorsLayer;

mod db;
mod error;
mod payloads;
mod routes;

pub struct ApiState {
    db: Postgrest,
}

pub type State = extract::State<Arc<Mutex<ApiState>>>;

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    env::var("JWT_SECRET").expect("Expected JWT_SECRET in env variables");

    let shared_state = Arc::new(Mutex::new(ApiState {
        db: connect_to_database().await,
    }));

    let cors = CorsLayer::new()
        .allow_headers([
            AUTHORIZATION,
            CONTENT_TYPE,
            HeaderName::from_static("x-timezone"),
        ])
        .allow_methods([Method::GET, Method::PATCH, Method::DELETE])
        .allow_origin(
            if cfg!(debug_assertions) {
                "http://localhost:5173".to_owned()
            } else {
                env::var("FRONTEND_URL").expect("Missing FRONTEND_URL environment variable")
            }
            .parse::<HeaderValue>()
            .unwrap(),
        );

    let app = Router::new()
        .route("/ping", get(ping_handler))
        .route("/month/:month_year", get(get_month))
        .route("/day", patch(update_day))
        .route("/user", delete(delete_user))
        .route_layer(middleware::from_fn_with_state(
            shared_state.clone(),
            require_auth,
        ))
        .with_state(shared_state)
        .layer(cors);

    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));

    Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .expect("Failed to start server");
}

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    aud: String,
    exp: usize,
}

async fn require_auth<T>(
    headers: HeaderMap,
    mut request: Request<T>,
    next: Next<T>,
) -> Result<Response, ApiError> {
    let auth_header = if let Some(token) = headers.get("authorization") {
        token.to_str().map_err(|_| ApiError::NotAuthorized)?
    } else {
        Err(ApiError::NotAuthorized)?
    };

    if let Some(token) = auth_header.strip_prefix("Bearer ") {
        let token_secret = env::var("JWT_SECRET").expect("Expected JWT_SECRET in env variables");

        let validation = Validation::new(Algorithm::HS256);

        let token_data: TokenData<Claims> = decode::<Claims>(
            token,
            &DecodingKey::from_secret(token_secret.as_bytes()),
            &validation,
        )
        .map_or_else(|_| Err(ApiError::NotAuthorized), Ok)?;

        let current_time = Utc::now().timestamp();

        if token_data.claims.aud == "authenticated"
            && token_data.claims.exp >= (current_time as usize)
        {
            request.extensions_mut().insert(token_data.claims.sub);
            return Ok(next.run(request).await);
        }
    }
    Err(ApiError::NotAuthorized)
}

#[derive(serde::Serialize)]
struct Message {
    message: String,
}

async fn ping_handler() -> Json<Message> {
    Json(Message {
        message: String::from("pong"),
    })
}
