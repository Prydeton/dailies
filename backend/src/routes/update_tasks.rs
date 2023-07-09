use std::sync::Arc;
use axum::{extract::State, Json};
use chrono::Local;
use serde_json::to_string;
use tokio::sync::Mutex;

use crate::{ApiState, payloads::{ApiResult, UpdateTasksInput, Task}, error::ApiError};

pub async fn update_tasks(
  state: State<Arc<Mutex<ApiState>>>,
  Json(input): Json<UpdateTasksInput>,
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
    
  let new_tasks: Vec<Task> = tasks
    .iter()
    .enumerate()
    .map(|(i, task)| Task {
      id: task.id.clone(),
      user_id: "test".to_string(),
      name: task.name.clone(),
      date: current_date_string.to_string(),
      order: i as i32,
      is_complete: false,
    })
    .collect();

  db
    .from("task")
    .upsert(to_string(&new_tasks).unwrap())
    .execute()
    .await
    .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

  Ok(Json("temp".to_string()))
}