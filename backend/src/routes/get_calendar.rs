use std::sync::Arc;

use tokio::sync::{Mutex};

use axum::{extract::{State}, Json};

use crate::{payloads::{ApiResult, GetCalendarResponse}, error::ApiError, ApiState};

pub async fn get_calendar(state: State<Arc<Mutex<ApiState>>>) -> ApiResult<GetCalendarResponse> {
  let db = &state.lock().await.db;

  let res = db.from("task")
  .select("*")
  .order("date")
  .execute()
  .await
  .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

  let body = res
    .text()
    .await
    .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

  Ok(Json(body))
}