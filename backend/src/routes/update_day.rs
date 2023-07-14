use axum::{extract::State, Extension, Json};
use serde_json::{from_str, json};
use std::sync::Arc;
use tokio::sync::Mutex;

use crate::{
    error::ApiError,
    payloads::{ApiResult, Task, UpdateDayInput, UpdateDayResponse},
    ApiState,
};

pub async fn update_day(
    state: State<Arc<Mutex<ApiState>>>,
    Extension(user_id): Extension<String>,
    Json(UpdateDayInput { tasks, date }): Json<UpdateDayInput>,
) -> ApiResult<UpdateDayResponse> {
    let db = &state.lock().await.db;

    let payload = json!({
      "tasks": tasks,
      "param_date": date,
      "param_user_id": user_id,
    })
    .to_string();

    let res = db
        .rpc("update_day", &payload)
        .execute()
        .await
        .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

    let body = &res
        .text()
        .await
        .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

    let tasks: Vec<Task> =
        from_str(body).map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

    Ok(Json(UpdateDayResponse { tasks }))
}
