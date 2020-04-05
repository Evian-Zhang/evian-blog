CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL UNIQUE,
    body VARCHAR NOT NULL,
    publish_date TIMESTAMPTZ NOT NULL,
    last_update_date TIMESTAMPTZ NOT NULL,
    series_id INTEGER REFERENCES series(id),
    series_index INTEGER
);
CREATE INDEX articles_series_id ON articles(series_id);
