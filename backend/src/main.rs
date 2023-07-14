use std::{net::SocketAddr, sync::Arc, env};
use axum::{
  routing::{get, patch}, Router, Json, Server, extract, http::{header::{AUTHORIZATION, CONTENT_TYPE}, Method, HeaderValue, HeaderMap, Request}, middleware::{self, Next}, response::Response,
};
use chrono::Utc;
use db::connect_to_database;
use error::ApiError;
use jsonwebtoken::{Validation, Algorithm, TokenData, decode, DecodingKey};
use postgrest::Postgrest;
use routes::{get_calendar::get_calendar, update_day::update_day};
use serde::{Serialize, Deserialize};
use tokio::sync::Mutex;
use tower_http::cors::CorsLayer;

mod routes;
mod payloads;
mod error;
mod db;

pub struct ApiState {
  db: Postgrest,
}

pub type State = extract::State<Arc<Mutex<ApiState>>>;

#[tokio::main]
async fn main() {
  dotenvy::dotenv().ok();

  env::var("JWT_SECRET")
    .expect("Expected JWT_SECRET in env variables");

  let shared_state = Arc::new(Mutex::new(ApiState{
    db: connect_to_database().await,
  }));

  let cors = CorsLayer::new()
    .allow_headers([AUTHORIZATION, CONTENT_TYPE])
    .allow_methods([Method::GET, Method::PATCH])
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
    .route("/calendar", get(get_calendar))
    .route("/day", patch(update_day))
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
  next: Next<T>
) -> Result<Response, ApiError>   {
  let auth_header = if let Some(token) = headers.get("authorization") {
    token.to_str().map_err(|_| {
      ApiError::NotAuthorized
    })?
  } else {
    Err(ApiError::NotAuthorized)?
  };

  if auth_header.starts_with("Bearer ") {
    let token = auth_header.trim_start_matches("Bearer ");
    let token_secret = env::var("JWT_SECRET")
      .expect("Expected JWT_SECRET in env variables");// Replace with your actual token secret

    let validation = Validation::new(Algorithm::HS256);

    let token_data: TokenData<Claims> = decode::<Claims>(
      token,
      &DecodingKey::from_secret(token_secret.as_bytes()),
      &validation,
    ).map_or_else(|_| { Err(ApiError::NotAuthorized) }, Ok )?;

    let current_time = Utc::now().timestamp();

    if token_data.claims.aud == "authenticated" && token_data.claims.exp >= (current_time as usize) {
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

