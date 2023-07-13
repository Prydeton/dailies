use std::{sync::Arc, collections::HashMap};
use serde_json::from_str;
use tokio::sync::Mutex;
use chrono::prelude::*;
use axum::{extract::State, Json, Extension};
use uuid::Uuid;

use crate::{
  payloads::{ApiResult, Task, Calendar},
  error::ApiError,
  ApiState,
};

pub async fn get_calendar(
  state: State<Arc<Mutex<ApiState>>>, 
  Extension(user_id): Extension<String>
) -> ApiResult<Calendar> {
  let db = &state.lock().await.db;

  let res = db
    .from("task")
    .select("*")
    .eq("user_id", user_id)
    .order("date")
    .execute()
    .await
    .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

  let tasks: Vec<Task> = from_str(&res.text().await.unwrap())
    .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

  let mut calendar = HashMap::new();
  let current_date = Local::now().naive_local().date();

  if tasks.is_empty() {
    let first_task = Task {
      id: Uuid::new_v4().to_string(),
      user_id: Uuid::new_v4().to_string(),
      name: "".to_string(),
      is_complete: false,
      date: current_date.to_string(),
      order: 1,
    };
    calendar.insert(current_date.to_string(), vec![first_task]);
  } else {
    let first_task_date: NaiveDate = NaiveDate::parse_from_str(&tasks.first().unwrap().date, "%Y-%m-%d").unwrap();
    let first_display_day = first_task_date.with_day(1).unwrap();
    let mut date = first_display_day;

    while date < first_task_date {
      let date_string = date.format("%Y-%m-%d").to_string();
      calendar.insert(date_string.clone(), Vec::new());
      date += chrono::Duration::days(1)
    }

    date = first_task_date;
    let mut prev_tasks_for_date: Vec<Task> = Vec::new();
    while date <= current_date {
      let date_string = date.format("%Y-%m-%d").to_string();
      let tasks_for_date: Vec<Task> = tasks
        .iter()
        .filter(|task| task.date == date_string)
        .cloned()
        .collect();

      if tasks_for_date.is_empty() {
        let generated_tasks_for_date = prev_tasks_for_date.iter()
        .map(|task| Task {
          id: Uuid::new_v4().to_string(),
          is_complete: false,
          date: date_string.clone(),
          ..task.clone()
        })
        .collect();
        calendar.insert(date_string.clone(), generated_tasks_for_date);
      } else {
        calendar.insert(date_string.clone(), tasks_for_date.clone());
        prev_tasks_for_date = tasks_for_date
      }
      
      date += chrono::Duration::days(1);
    }

    let last_display_day = current_date
      .with_day(1).unwrap()
      .with_month(current_date.month() + 1).unwrap()
      .pred_opt().unwrap();
    date = current_date;
    while date <= last_display_day {
      let date_string = date.format("%Y-%m-%d").to_string();
      calendar.insert(date_string.clone(), Vec::new());
      date += chrono::Duration::days(1)
    }
  };
  Ok(Json(Calendar(calendar)))
}