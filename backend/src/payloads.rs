use std::collections::HashMap;

use crate::error::ApiError;
use axum::Json;
use serde::{Deserialize, Serialize};

#[derive(Clone, Serialize, Deserialize)]
pub struct Task {
    pub id: String,
    pub user_id: String,
    pub name: String,
    pub is_complete: bool,
    pub date: String,
    pub order: i32,
}

#[derive(Clone, Serialize, Deserialize)]
pub struct Calendar(pub HashMap<String, Vec<Task>>);

pub type ApiResult<T> = Result<Json<T>, ApiError>;

#[derive(Serialize, Deserialize)]
pub struct GetCalendarResponse {
    pub calendar: Calendar,
}

#[derive(Deserialize, Serialize)]
pub struct DayTaskUpdate {
    pub id: String,
    pub name: String,
    pub is_complete: bool,
    pub order: i32,
}

#[derive(Deserialize)]
pub struct UpdateDayInput {
    pub tasks: Vec<DayTaskUpdate>,
    pub date: String,
}

#[derive(Serialize, Deserialize)]
pub struct UpdateDayResponse {
    pub tasks: Vec<Task>,
}

#[derive(Serialize, Deserialize)]
pub struct DeleteUserResponse {
    pub user_id: String,
}
