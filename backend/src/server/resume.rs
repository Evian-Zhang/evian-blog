use crate::database::Database;

use log::error;
use actix_web::{web, HttpResponse, get, post};

use std::fmt;

fn map_to_internal_server_error<T: fmt::Display>(error: T) -> HttpResponse {
    error!("{}", error);
    HttpResponse::InternalServerError().body(format!("{}", error))
}

// ---------------------------Visitor Methods---------------------------
#[get("/resume")]
pub async fn get_resume(database: web::Data<Database>) -> Result<HttpResponse, HttpResponse> {
    let resume = database.resume.get_resume()
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(resume))
}

// ---------------------------Admin Methods---------------------------
#[post("/resume")]
pub async fn post_resume(database: web::Data<Database>, resume: web::Json<String>) -> Result<HttpResponse, HttpResponse>  {
    database.resume.post_resume(resume.into_inner())
        .await
        .map_err(map_to_internal_server_error)?;
    Ok(HttpResponse::Ok().finish())
}