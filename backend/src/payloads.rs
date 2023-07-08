//use std::collections::HashMap;

use axum::Json;
use serde::{Serialize, Deserialize};
use crate::error::ApiError;

#[derive(Serialize, Deserialize)]
pub struct Task {
  id: i32,
  user_id: i32,
  name: String,
  is_complete: bool,
  date: String,
  order: i32,
}

pub type ApiResult<T> = Result<Json<T>, ApiError>;

//pub struct GetCalendarResponse (/<String, Vec<Task>>);
pub type GetCalendarResponse = String;