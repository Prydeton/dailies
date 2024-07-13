use axum::{extract::Path, extract::State, http::HeaderMap, Extension, Json};
use chrono::prelude::*;
use chrono_tz::Tz;
use serde_json::from_str;
use std::{sync::Arc, vec};
use tokio::sync::Mutex;
use uuid::Uuid;

use crate::{
    error::ApiError,
    payloads::{ApiResult, Day, GetMonthResponse, Task},
    ApiState,
};

pub async fn get_month(
    state: State<Arc<Mutex<ApiState>>>,
    Extension(user_id): Extension<String>,
    headers: HeaderMap,
    Path(year_month): Path<String>,
) -> ApiResult<GetMonthResponse> {
    let db = &state.lock().await.db;

    let timezone: Tz = headers
        .get("x-timezone")
        .and_then(|timezone| timezone.to_str().ok())
        .and_then(|timezone_str| timezone_str.parse::<Tz>().ok())
        .unwrap_or(Tz::UTC);

    let current_date = timezone
        .from_utc_datetime(&Local::now().naive_utc())
        .date_naive();

    let requested_month_string = format!("{}-01", year_month);
    let requested_month = NaiveDate::parse_from_str(&requested_month_string, "%Y-%m-%d")
        .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

    let first_day = requested_month.with_day0(0).unwrap();
    let last_day = requested_month
        .with_day(1)
        .unwrap()
        .with_month(requested_month.month() + 1)
        .unwrap_or_else(|| {
            requested_month
                .with_day(1)
                .unwrap()
                .with_year(requested_month.year() + 1)
                .unwrap()
                .with_month(1)
                .unwrap()
        })
        .pred_opt()
        .unwrap();

    let db_month_tasks_res = db
        .from("task")
        .select("*")
        .eq("user_id", &user_id)
        .gte("date", first_day.format("%Y-%m-%d").to_string())
        .lte("date", last_day.format("%Y-%m-%d").to_string())
        .order("date")
        .execute()
        .await
        .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

    let db_month_tasks: Vec<Task> = from_str(&db_month_tasks_res.text().await.unwrap())
        .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

    let most_recent_task_res = db
        .from("task")
        .select("*")
        .eq("user_id", &user_id)
        .lt("date", first_day.format("%Y-%m-%d").to_string())
        .order("date")
        .limit(1)
        .execute()
        .await
        .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

    let most_recent_task: Vec<Task> = from_str(&most_recent_task_res.text().await.unwrap())
        .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

    let most_recent_tasks: Vec<Task> = if most_recent_task.is_empty() && db_month_tasks.is_empty() {
        vec![Task {
            id: Uuid::new_v4().to_string(),
            user_id: Uuid::new_v4().to_string(),
            name: "Welcome!".to_string(),
            is_complete: false,
            date: current_date.to_string(),
            order: 0,
        }]
    } else {
        let most_recent_tasks_res = db
            .from("task")
            .select("*")
            .eq("user_id", &user_id)
            .eq("date", &most_recent_task.get(0).unwrap().date)
            .order("date")
            .execute()
            .await
            .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

        from_str(&most_recent_tasks_res.text().await.unwrap())
            .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?
    };

    let mut month: Vec<Day> = vec![];
    let mut last_completed_tasks: Vec<Task> = Vec::new();
    let mut working_day = first_day;

    while working_day < last_day {
        let working_day_string = working_day.format("%Y-%m-%d").to_string();
        let tasks_for_day: Vec<Task> = db_month_tasks
            .iter()
            .filter(|task| task.date == working_day_string)
            .cloned()
            .collect();

        if tasks_for_day.is_empty() {
            month.push(Day {
                date: working_day_string,
                tasks: last_completed_tasks.to_vec(),
            })
        } else {
            month.push(Day {
                date: working_day_string,
                tasks: tasks_for_day.clone(),
            });
            last_completed_tasks = tasks_for_day.clone();
        }

        working_day += chrono::Duration::days(1);
    }

    Ok(Json(GetMonthResponse { days: month }))
}
