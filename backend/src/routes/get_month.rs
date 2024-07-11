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
    dbg!("1");
    let db = &state.lock().await.db;
    dbg!("2");
    let timezone: Tz = headers
        .get("x-timezone")
        .and_then(|timezone| timezone.to_str().ok())
        .and_then(|timezone_str| timezone_str.parse::<Tz>().ok())
        .unwrap_or(Tz::UTC);

    let current_date = timezone
        .from_utc_datetime(&Local::now().naive_utc())
        .date_naive();

    dbg!("3");
    dbg!(format!("{}-01", year_month));
    let requested_month_string = format!("{}-01", year_month);
    let requested_month = NaiveDate::parse_from_str(&requested_month_string, "%Y-%m-%d")
        .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;
    dbg!("4");
    let requested_month_iso = requested_month.to_string();
    dbg!(&requested_month_iso);
    dbg!("5");
    let month_tasks_res = db
        .from("task")
        .select("*")
        .eq("user_id", &user_id)
        .gte("date", &requested_month_string)
        .order("date")
        .execute()
        .await
        .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;
    dbg!("6");
    let month_tasks: Vec<Task> = from_str(&month_tasks_res.text().await.unwrap())
        .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;
    dbg!("7");
    let mut filled_month_tasks: Vec<Day> = vec![];
    if month_tasks.is_empty() {
        let most_recent_task_res = db
            .from("task")
            .select("*")
            .eq("user_id", &user_id)
            .order("date")
            .limit(1)
            .execute()
            .await
            .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

        let most_recent_task: Vec<Task> = from_str(&most_recent_task_res.text().await.unwrap())
            .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

        let most_recent_task = most_recent_task.get(0);
        match most_recent_task {
            Some(most_recent_task) => {
                let most_recent_tasks_res = db
                    .from("task")
                    .select("*")
                    .eq("user_id", &user_id)
                    .eq("date", &most_recent_task.date)
                    .order("date")
                    .limit(1)
                    .execute()
                    .await
                    .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

                let most_recent_tasks: Vec<Task> =
                    from_str(&most_recent_tasks_res.text().await.unwrap())
                        .map_err(|error| ApiError::PostgrestrsError(error.to_string()))?;

                let mut working_date = requested_month.with_day0(0).unwrap();
                while working_date <= current_date {
                    let date_string = working_date.format("%Y-%m-%d").to_string();
                    filled_month_tasks.push(Day {
                        date: date_string,
                        tasks: most_recent_tasks.clone(),
                    });
                    working_date += chrono::Duration::days(1);
                }
            }
            None => {
                let mut working_date = requested_month.with_day0(0).unwrap();
                while working_date < current_date {
                    let date_string = working_date.format("%Y-%m-%d").to_string();
                    filled_month_tasks.push(Day {
                        date: date_string,
                        tasks: vec![],
                    });
                    working_date += chrono::Duration::days(1);
                }

                let first_task = Task {
                    id: Uuid::new_v4().to_string(),
                    user_id: Uuid::new_v4().to_string(),
                    name: "Welcome!".to_string(),
                    is_complete: false,
                    date: current_date.to_string(),
                    order: 1,
                };

                filled_month_tasks.push(Day {
                    date: current_date.format("%Y-%m-%d").to_string(),
                    tasks: vec![first_task],
                });
            }
        };
    } else {
        let mut prev_tasks_for_date: Vec<Task> = Vec::new();
        let mut working_date = requested_month.with_day0(0).unwrap();
        while working_date.day0() <= current_date.day0() {
            let working_date_string = working_date.format("%Y-%m-%d").to_string();
            let tasks_for_date: Vec<Task> = month_tasks
                .iter()
                .filter(|task| task.date == working_date_string)
                .cloned()
                .collect();

            if tasks_for_date.is_empty() {
                let generated_tasks_for_date = prev_tasks_for_date
                    .iter()
                    .map(|task| Task {
                        id: Uuid::new_v4().to_string(),
                        is_complete: false,
                        date: working_date_string.clone(),
                        ..task.clone()
                    })
                    .collect();
                filled_month_tasks.push(Day {
                    date: working_date_string,
                    tasks: generated_tasks_for_date,
                });
            } else {
                filled_month_tasks.push(Day {
                    date: working_date_string,
                    tasks: tasks_for_date.clone(),
                });
                prev_tasks_for_date = tasks_for_date;
            };
            working_date += chrono::Duration::days(1);
        }
    };
    dbg!("post: 1");
    dbg!(&filled_month_tasks);
    let last_display_day = current_date
        .with_day(1)
        .unwrap()
        .with_month(current_date.month() + 1)
        .unwrap_or_else(|| {
            current_date
                .with_day(1)
                .unwrap()
                .with_year(current_date.year() + 1)
                .unwrap()
                .with_month(1)
                .unwrap()
        })
        .pred_opt()
        .unwrap();

    let mut working_date = current_date + chrono::Duration::days(1);
    while working_date <= last_display_day {
        let date_string = working_date.format("%Y-%m-%d").to_string();
        filled_month_tasks.push(Day {
            date: date_string,
            tasks: vec![],
        });
        working_date += chrono::Duration::days(1);
    }

    Ok(Json(GetMonthResponse {
        days: filled_month_tasks,
    }))
}
