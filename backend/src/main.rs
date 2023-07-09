use std::{net::SocketAddr, sync::Arc};

use axum::{
  routing::{get, patch}, Router, Json, Server, extract,
};
use db::connect_to_database;
use postgrest::Postgrest;
use routes::{get_calendar::get_calendar, update_tasks::update_tasks};
use tokio::sync::Mutex;

mod routes;
mod payloads;
mod error;
mod db;

pub struct ApiState {
  db: Postgrest
}

pub type State = extract::State<Arc<Mutex<ApiState>>>;

#[tokio::main]
async fn main() {
  dotenvy::dotenv().ok();

  let shared_state = Arc::new(Mutex::new(ApiState{
    db: connect_to_database().await
  }));

  let app = Router::new()
    .route("/ping", get(ping_handler))
    .route("/calendar", get(get_calendar))
    .route("/tasks", patch(update_tasks))
    .with_state(shared_state);

  let addr = SocketAddr::from(([0, 0, 0, 0], 3000));

  Server::bind(&addr)
    .serve(app.into_make_service())
    .await
    .expect("Failed to start server");
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