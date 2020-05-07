use crate::database::{Database, project::models::*};

use log::error;
use actix_web::{web, HttpResponse, get, post};

use std::fmt;

fn map_to_internal_server_error<T: fmt::Display>(error: T) -> HttpResponse {
    error!("{}", error);
    HttpResponse::InternalServerError().body(format!("{}", error))
}

// ---------------------------Visitor Methods---------------------------
#[get("/projects")]
pub async fn get_all_projects(database: web::Data<Database>) -> Result<HttpResponse, HttpResponse> {
    let projects = database.project.get_all_projects()
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(projects))
}

// ---------------------------Admin Methods---------------------------
#[post("/project")]
pub async fn post_project(database: web::Data<Database>, project: web::Json<Project>) -> Result<HttpResponse, HttpResponse>  {
    database.project.post_project(project.into_inner())
        .await
        .map_err(map_to_internal_server_error)?;
    Ok(HttpResponse::Ok().finish())
}