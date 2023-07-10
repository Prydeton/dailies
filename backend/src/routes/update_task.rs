use std::sync::Arc;
use axum::{extract::State, Json, Extension};
use serde_json::{to_string};
use tokio::sync::Mutex;

use crate::{ApiState, payloads::{ApiResult, UpdateTaskInput, Task}, error::ApiError};

pub async fn update_task(
  state: State<Arc<Mutex<ApiState>>>, 
  Extension(user_id): Extension<String>,
  Json(task): Json<UpdateTaskInput>,
) -> ApiResult<String> {
  let db = &state.lock().await.db;

  let upsert_task_string = to_string(
    &Task {
      id: task.id,
      user_id,
      name: task.name,
      is_complete: task.is_complete,
      date: task.date,
      order: task.order
    }
  ).unwrap();

  db
    .from("task")
    .upsert(&upsert_task_string)
    .execute()
    .await
    .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;
  
  Ok(Json(upsert_task_string))
}