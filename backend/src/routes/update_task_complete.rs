use std::sync::Arc;
use axum::{extract::State, Json};
use chrono::Local;
use tokio::sync::Mutex;

use crate::{ApiState, payloads::{ApiResult, UpdateTaskListInput}, error::ApiError};

pub async fn update_tasks(
  state: State<Arc<Mutex<ApiState>>>,
  Json(input): Json<UpdateTaskListInput>,
) -> ApiResult<String> {
  let tasks = input.tasks;
  let db = &state.lock().await.db;
  
  let current_date_string = Arc::new(Local::now().naive_local().date().format("%Y-%m-%d").to_string());
  
  db
    .from("task")
    .delete()
    .eq("date", &*current_date_string)
    .not("in", "id", tasks.iter().map(|task| task.id.clone()).collect::<Vec<String>>().join(","))
    .execute()
    .await
    .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

  Ok(Json("temp".to_string()))
}