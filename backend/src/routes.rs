use crate::database::DbPool;
use crate::database::{actions, get_connection};

use log::error;
use actix_web::{web, HttpResponse, HttpServer, Responder, get};

use std::fmt;

fn map_to_internal_server_error<T: fmt::Display>(error: T) -> HttpResponse {
    error!("{}", error);
    HttpResponse::InternalServerError().finish()
}

#[get("/tags")]
pub async fn get_all_tags(db_pool: web::Data<DbPool>) -> Result<HttpResponse, actix_web::Error> {
    let pg_connection = get_connection(&db_pool).map_err(map_to_internal_server_error)?;
    let tags = web::block(move || actions::get_all_tags(&pg_connection))
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(tags))
}

#[get("/series")]
pub async fn get_all_series(db_pool: web::Data<DbPool>) -> Result<HttpResponse, actix_web::Error> {
    let pg_connection = get_connection(&db_pool).map_err(map_to_internal_server_error)?;
    let series = web::block(move || actions::get_all_series(&pg_connection))
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(series))
}

#[get("/tag/{tag_name}")]
pub async fn get_all_articles_of_tag(db_pool: web::Data<DbPool>, tag_name: web::Path<String>) -> Result<HttpResponse, actix_web::Error> {
    let pg_connection = get_connection(&db_pool).map_err(map_to_internal_server_error)?;
    let articles = web::block(move || actions::get_all_articles_of_tag(&pg_connection, &tag_name))
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(articles))
}