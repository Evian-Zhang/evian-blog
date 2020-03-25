CREATE TABLE series (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE
);
CREATE INDEX series_name ON series(name);