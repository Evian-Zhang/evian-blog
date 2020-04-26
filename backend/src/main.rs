mod init;
mod database;
mod server;

use log::{error};
use actix_web::{web, middleware, App, HttpServer};

#[macro_use]
extern crate maplit;

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
    let database = init::init_database(app_config.database);

    // init server
    let server_socket = app_config.server.to_socket();
    HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::default())
            .service(web::scope("/api/v1")
                // Application data does not need to be `Send` or `Sync`. Internally `Data` type uses `Arc`. If your data implements `Send` + `Sync` trait you can use `web::Data::new()` and avoid double `Arc`
                .data(database.clone())
                .service(server::get_all_tags)
                .service(server::get_all_series)
                .service(server::get_all_articles_count_of_tag)
                .service(server::get_all_articles_of_tag)
                .service(server::get_all_articles_count_of_series)
                .service(server::get_all_articles_of_series)
                .service(server::get_all_articles)
                .service(server::get_article_of_title)
                .service(server::get_all_article_titles)
                .service(server::get_all_articles_count)
            )
    })
    .bind(&server_socket)?
    .run()
    .await
}
