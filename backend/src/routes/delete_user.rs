use axum::{extract::State, Extension, Json};
use serde_json::json;
use std::sync::Arc;
use tokio::sync::Mutex;

use crate::{
    error::ApiError,
    payloads::{ApiResult, DeleteUserResponse},
    ApiState,
};

pub async fn delete_user(
    state: State<Arc<Mutex<ApiState>>>,
    Extension(user_id): Extension<String>,
) -> ApiResult<DeleteUserResponse> {
    let db = &state.lock().await.db;

    db.rpc("delete_user", json!({ "user_id": user_id }).to_string())
        .execute()
        .await
        .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

    Ok(Json(DeleteUserResponse { user_id }))
}
