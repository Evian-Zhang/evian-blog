mod init;


use actix_web::{web, App, HttpResponse, HttpServer, Responder, get};

use std::io::Write;
use std::env;

#[get("/hello")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    init::initialize();

    HttpServer::new(|| {
        App::new()
            .service(web::scope("/api/v1").service(index))
    })
    .bind("localhost:8088")?
    .run()
    .await
}
