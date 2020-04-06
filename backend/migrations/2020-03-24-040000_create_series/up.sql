CREATE TABLE series (
    id SERIAL PRIMARY KEY,
    -- Adding a unique constraint will automatically create a unique B-tree index
    name VARCHAR NOT NULL,
    last_update_date TIMESTAMPTZ NOT NULL
);