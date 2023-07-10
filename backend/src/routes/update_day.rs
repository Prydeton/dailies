use std::sync::Arc;
use axum::{extract::State, Json, Extension};
use serde_json::to_string;
use tokio::sync::Mutex;

use crate::{ApiState, payloads::{ApiResult, UpdateDayInput, Task}, error::ApiError};

pub async fn update_day(
  state: State<Arc<Mutex<ApiState>>>,
  Extension(user_id): Extension<String>,
  Json(UpdateDayInput { tasks, date }): Json<UpdateDayInput>,
) -> ApiResult<String> {
  let db = &state.lock().await.db;
  
  db
    .from("task")
    .delete()
    .eq("date", date.clone())
    .not("in", "id", tasks.iter().map(|task| task.id.clone()).collect::<Vec<String>>().join(","))
    .execute()
    .await
    .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

  let new_tasks_string = to_string(&tasks
    .iter()
    .enumerate()
    .map(|(i, task)| Task {
      id: task.id.clone(),
      user_id: user_id.clone(),
      name: task.name.clone(),
      date: date.clone(),
      order: i as i32,
      is_complete: false,
    })
    .collect::<Vec<Task>>()
  )
  .unwrap();

  db
    .from("task")
    .upsert(&new_tasks_string)
    .execute()
    .await
    .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

  Ok(Json(new_tasks_string))
}