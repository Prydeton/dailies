//use std::collections::HashMap;

use std::{collections::HashMap};

use axum::Json;
use serde::{Serialize, Deserialize};
use crate::error::ApiError;

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