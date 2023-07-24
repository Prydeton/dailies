use axum::{extract::State, Extension, Json};
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
    let auth_db = &state.lock().await.auth_db;

    auth_db
        .from("users")
        .delete()
        .eq("id", &user_id)
        .execute()
        .await
        .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

    Ok(Json(DeleteUserResponse { user_id }))
}
