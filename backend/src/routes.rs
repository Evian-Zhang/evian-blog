use crate::database::DbPool;
use crate::database::actions;

use actix_web::{web, App, HttpResponse, HttpServer, Responder, get};

#[get("/tags")]
pub async fn get_tags(db_pool: web::Data<DbPool>) -> impl Responder {
    let pg_connection = db_pool.get();
    actions::get_tags(pg_connection)
}