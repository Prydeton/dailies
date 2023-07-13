use std::sync::Arc;
use axum::{extract::State, Json, Extension};
use serde_json::to_string;
use tokio::sync::Mutex;

use crate::{ApiState, payloads::{ApiResult, UpdateTaskInput, Task, UpdateTaskResponse}, error::ApiError};

pub async fn update_task(
  state: State<Arc<Mutex<ApiState>>>, 
  Extension(user_id): Extension<String>,
  Json(task): Json<UpdateTaskInput>,
) -> ApiResult<UpdateTaskResponse> {
  let db = &state.lock().await.db;
  
  let upsert_task: Task = Task {
    id: task.id,
    user_id,
    name: task.name,
    is_complete: task.is_complete,
    date: task.date,
    order: task.order
  };

  let upsert_task_string = to_string(&upsert_task).unwrap();

  db
    .from("task")
    .upsert(&upsert_task_string)
    .execute()
    .await
    .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;
  
  Ok(Json(UpdateTaskResponse { task: upsert_task }))
}