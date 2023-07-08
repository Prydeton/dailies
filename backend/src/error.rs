use axum::{response::{Response, IntoResponse}, http::StatusCode, body::{BoxBody, Body}};

pub enum ApiError {
  PostgrestrsError(String),
}

impl IntoResponse for ApiError {
  fn into_response(self) -> Response<BoxBody> {
      match self {
          ApiError::PostgrestrsError(error) => {
              let body = format!("Error: {}", error);

              let response = Response::builder()
                  .status(StatusCode::INTERNAL_SERVER_ERROR)
                  .body(Body::from(body))
                  .unwrap();

              response.into_response()
          }
      }
  }
}