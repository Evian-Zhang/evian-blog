CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);
CREATE INDEX tag_name ON tags(name);