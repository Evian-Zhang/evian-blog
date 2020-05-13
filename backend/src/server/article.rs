use crate::database::{Database, article::models::*};

use log::error;
use actix_web::{web, HttpResponse, get, post};
use serde::Deserialize;

use std::fmt;

fn map_to_internal_server_error<T: fmt::Display>(error: T) -> HttpResponse {
    error!("{}", error);
    HttpResponse::InternalServerError().body(format!("{}", error))
}

// ---------------------------Visitor Methods---------------------------
#[get("/writings/tags")]
pub async fn get_all_tags(database: web::Data<Database>) -> Result<HttpResponse, HttpResponse> {
    let tags = database.article.get_all_tags()
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(tags))
}

#[get("/writings/series")]
pub async fn get_all_series(database: web::Data<Database>) -> Result<HttpResponse, HttpResponse> {
    let series = database.article.get_all_series()
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

#[get("/writings/tag/{tag_name}/count")]
pub async fn get_all_articles_count_of_tag(
    database: web::Data<Database>,
    tag_name: web::Path<String>,
) -> Result<HttpResponse, HttpResponse> {
    let count = database.article.get_all_articles_count_of_tag(&tag_name)
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(count))
}

#[get("/writings/tag/{tag_name}")]
pub async fn get_all_articles_of_tag(
    database: web::Data<Database>,
    tag_name: web::Path<String>,
    web::Query(page_info): web::Query<PageInfo>
) -> Result<HttpResponse, HttpResponse> {
    if !page_info.check() {
        return Err(HttpResponse::BadRequest().finish());
    }
    let articles = database.article.get_all_articles_of_tag(&tag_name, page_info.page_index, page_info.page_size)
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(articles))
}

#[get("/writings/series/{series_name}/count")]
pub async fn get_all_articles_count_of_series(
    database: web::Data<Database>,
    series_name: web::Path<String>,
) -> Result<HttpResponse, HttpResponse> {
    let count = database.article.get_all_articles_count_of_series(&series_name)
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(count))
}

#[get("/writings/series/{series_name}")]
pub async fn get_all_articles_of_series(
    database: web::Data<Database>,
    series_name: web::Path<String>,
    web::Query(page_info): web::Query<PageInfo>
) -> Result<HttpResponse, HttpResponse> {
    if !page_info.check() {
        return Err(HttpResponse::BadRequest().finish());
    }
    let articles = database.article.get_all_articles_of_series(&series_name, page_info.page_index, page_info.page_size)
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(articles))
}

#[get("/writings/article/{article_title}")]
pub async fn get_article_of_title(database: web::Data<Database>, article_title: web::Path<String>) -> Result<HttpResponse, HttpResponse> {
    let article = database.article.get_article(&article_title)
        .await
        .map_err(map_to_internal_server_error)?;

    let article = if let Some(article) = article {
        article
    } else {
        return Err(HttpResponse::NotFound().finish());
    };

    Ok(HttpResponse::Ok().json(article))
}

#[get("/writings/articles/count")]
pub async fn get_all_articles_count(
    database: web::Data<Database>,
) -> Result<HttpResponse, HttpResponse> {
    let count = database.article.get_all_articles_count()
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(count))
}

#[get("/writings/articles")]
pub async fn get_all_articles(
    database: web::Data<Database>,
    web::Query(page_info): web::Query<PageInfo>
) -> Result<HttpResponse, HttpResponse> {
    if !page_info.check() {
        return Err(HttpResponse::BadRequest().finish());
    }
    let articles = database.article.get_all_articles(page_info.page_index, page_info.page_size)
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(articles))
}

#[get("/writings/articles/titles")]
pub async fn get_all_article_titles(database: web::Data<Database>) -> Result<HttpResponse, HttpResponse> {
    let article_titles = database.article.get_all_article_titles()
        .await
        .map_err(map_to_internal_server_error)?;

    Ok(HttpResponse::Ok().json(article_titles))
}

// ---------------------------Admin Methods---------------------------
#[post("/writings/article")]
pub async fn post_article(database: web::Data<Database>, article: web::Json<Article>) -> Result<HttpResponse, HttpResponse>  {
    database.article.post_article(article.into_inner())
        .await
        .map_err(map_to_internal_server_error)?;
    Ok(HttpResponse::Ok().finish())
}