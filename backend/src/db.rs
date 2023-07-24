use std::env;

use postgrest::Postgrest;

pub async fn connect_to_database() -> (Postgrest, Postgrest) {
    let db_endpoint =
        env::var("DATABASE_ENDPOINT").expect("Expected DATABASE_ENDPOINT in env variables");

    let db_secret = env::var("DATABASE_SECRET").expect("Expected DATABASE_SECRET in env variables");

    let public_db = Postgrest::new(&db_endpoint).insert_header("apikey", &db_secret);
    let auth_db = Postgrest::new(&db_endpoint)
        .insert_header("apikey", &db_secret)
        .schema("auth");

    (public_db, auth_db)
}
