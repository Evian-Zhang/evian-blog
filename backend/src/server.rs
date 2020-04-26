use crate::database::Database;

use log::error;
use actix_web::{web, HttpResponse, get};
use serde::Deserialize;

use std::fmt;

fn map_to_internal_server_error<T: fmt::Display>(error: T) -> HttpResponse {
    error!("{}", error);
    HttpResponse::InternalServerError().finish()
}

#[get("/tags")]
pub async fn get_all_tags(database: web::Data<Database>) -> Result<HttpResponse, HttpResponse> {
    let tags = database.get_all_tags()
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(tags))
}

#[get("/series")]
pub async fn get_all_series(database: web::Data<Database>) -> Result<HttpResponse, HttpResponse> {
    let series = database.get_all_series()
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(series))
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PageInfo {
    page_index: usize,
    page_size: usize
}

impl PageInfo {
    fn check(&self) -> bool {
        self.page_size > 0
    }
}

#[get("/tag/{tag_name}/count")]
pub async fn get_all_articles_count_of_tag(
    database: web::Data<Database>,
    tag_name: web::Path<String>,
) -> Result<HttpResponse, HttpResponse> {
    let count = database.get_all_articles_count_of_tag(&tag_name)
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(count))
}

#[get("/tag/{tag_name}")]
pub async fn get_all_articles_of_tag(
    database: web::Data<Database>,
    tag_name: web::Path<String>,
    web::Query(page_info): web::Query<PageInfo>
) -> Result<HttpResponse, HttpResponse> {
    if !page_info.check() {
        return Err(HttpResponse::BadRequest().finish());
    }
    let articles = database.get_all_articles_of_tag(&tag_name, page_info.page_index, page_info.page_size)
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(articles))
}

#[get("/tag/{series_name}/count")]
pub async fn get_all_articles_count_of_series(
    database: web::Data<Database>,
    series_name: web::Path<String>,
) -> Result<HttpResponse, HttpResponse> {
    let count = database.get_all_articles_count_of_series(&series_name)
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(count))
}

#[get("/series/{series_name}")]
pub async fn get_all_articles_of_series(
    database: web::Data<Database>,
    series_name: web::Path<String>,
    web::Query(page_info): web::Query<PageInfo>
) -> Result<HttpResponse, HttpResponse> {
    if !page_info.check() {
        return Err(HttpResponse::BadRequest().finish());
    }
    let articles = database.get_all_articles_of_series(&series_name, page_info.page_index, page_info.page_size)
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(articles))
}

#[get("/article/{article_title}")]
pub async fn get_article_of_title(database: web::Data<Database>, article_title: web::Path<String>) -> Result<HttpResponse, HttpResponse> {
    let article = database.get_article(&article_title)
        .await
        .map_err(map_to_internal_server_error)?;

    let article = if let Some(article) = article {
        article
    } else {
        return Err(HttpResponse::NotFound().finish());
    };

    Ok(HttpResponse::Ok().json(article))
}

#[get("/articles/count")]
pub async fn get_all_articles_count(
    database: web::Data<Database>,
) -> Result<HttpResponse, HttpResponse> {
    let count = database.get_all_articles_count()
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(count))
}

#[get("/articles")]
pub async fn get_all_articles(
    database: web::Data<Database>,
    web::Query(page_info): web::Query<PageInfo>
) -> Result<HttpResponse, HttpResponse> {
    if !page_info.check() {
        return Err(HttpResponse::BadRequest().finish());
    }
    let articles = database.get_all_articles(page_info.page_index, page_info.page_size)
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(articles))
}

#[get("/articles/titles")]
pub async fn get_all_article_titles(database: web::Data<Database>) -> Result<HttpResponse, HttpResponse> {
    let article_titles = database.get_all_article_titles()
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(article_titles))
}