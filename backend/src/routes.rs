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
pub async fn get_all_tags(db_pool: web::Data<DbPool>) -> Result<HttpResponse, HttpResponse> {
    let pg_connection = get_connection(&db_pool).map_err(map_to_internal_server_error)?;
    let tags = web::block(move || actions::get_all_tags(&pg_connection))
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(tags))
}

#[get("/series")]
pub async fn get_all_series(db_pool: web::Data<DbPool>) -> Result<HttpResponse, HttpResponse> {
    let pg_connection = get_connection(&db_pool).map_err(map_to_internal_server_error)?;
    let series = web::block(move || actions::get_all_series(&pg_connection))
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(series))
}

#[get("/tag/{tag_name}")]
pub async fn get_all_articles_of_tag(db_pool: web::Data<DbPool>, tag_name: web::Path<String>) -> Result<HttpResponse, HttpResponse> {
    let pg_connection = get_connection(&db_pool).map_err(map_to_internal_server_error)?;
    let articles = web::block(move || actions::get_all_articles_of_tag(&pg_connection, &tag_name))
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(articles))
}

#[get("/series/{series_name}")]
pub async fn get_all_articles_of_series(db_pool: web::Data<DbPool>, series_name: web::Path<String>) -> Result<HttpResponse, HttpResponse> {
    let pg_connection = get_connection(&db_pool).map_err(map_to_internal_server_error)?;
    let articles = web::block(move || actions::get_all_articles_of_series(&pg_connection, &series_name))
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(articles))
}

#[get("/article/{article_title}")]
pub async fn get_article_of_title(db_pool: web::Data<DbPool>, article_title: web::Path<String>) -> Result<HttpResponse, HttpResponse> {
    let pg_connection = get_connection(&db_pool).map_err(map_to_internal_server_error)?;
    let article = web::block(move || actions::get_article(&pg_connection, &article_title))
        .await
        .map_err(map_to_internal_server_error)?;

    let article = if let Some(article) = article {
        article
    } else {
        return Err(HttpResponse::NotFound().finish());
    };

    Ok(HttpResponse::Ok().json(article))
}

#[get("/articles")]
pub async fn get_all_articles(db_pool: web::Data<DbPool>) -> Result<HttpResponse, HttpResponse> {
    let pg_connection = get_connection(&db_pool).map_err(map_to_internal_server_error)?;
    let articles = web::block(move || actions::get_all_articles(&pg_connection))
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(articles))
}