mod init;
mod database;
mod routes;

use log::{error};
use actix_web::{web, middleware, App, HttpServer};

#[macro_use]
extern crate diesel_migrations;
#[macro_use]
extern crate diesel;

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

    // init database
    let database_url = app_config.database.to_url();
    let db_pool = match init::init_database(database_url) {
        Ok(db_pool) => db_pool,
        Err(error) => {
            error!("{}", error);
            std::process::exit(1);
        }
    };

    // init server
    let server_socket = app_config.server.to_socket();
    HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::default())
            .service(web::scope("/api/v1")
                // Application data does not need to be `Send` or `Sync`. Internally `Data` type uses `Arc`. If your data implements `Send` + `Sync` trait you can use `web::Data::new()` and avoid double `Arc`
                .data(db_pool.clone())
                .service(routes::get_all_tags)
                .service(routes::get_all_series)
                .service(routes::get_all_articles_of_tag)
                .service(routes::get_all_articles_of_series)
                .service(routes::get_article_of_title)
            )
    })
    .bind(&server_socket)?
    .run()
    .await
}
