mod init;
mod database;

use log::{error};
use actix_web::{web, App, HttpResponse, HttpServer, Responder, get};

#[macro_use]
extern crate diesel_migrations;
#[macro_use]
extern crate diesel;

#[get("/hello")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    // init logging
    init::init_logging();

    // init config by reading from config.toml
    let app_config = match init::init_config() {
        Ok(app_config) => app_config,
        Err(error) => {
            error!("{}", error);
            std::process::exit(1);
        }
    };

    let database_url = app_config.database.to_url();
    let pg_connection = match init::init_database(database_url) {
        Ok(pg_connection) => pg_connection,
        Err(error) => {
            error!("{}", error);
            std::process::exit(1);
        }
    };

    // init server
    let server_socket = app_config.server.to_socket();
    HttpServer::new(|| {
        App::new()
            .service(web::scope("/api/v1").service(index))
    })
    .bind(&server_socket)?
    .run()
    .await
}
