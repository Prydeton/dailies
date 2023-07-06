use std::net::SocketAddr;

use axum::{
  routing::{get}, Router, Json, Server,
};


#[tokio::main]
async fn main() {
  let app = Router::new()
    .route("/ping", get(ping_handler));

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