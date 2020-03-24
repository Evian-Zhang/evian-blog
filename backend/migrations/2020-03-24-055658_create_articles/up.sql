CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    body VARCHAR NOT NULL,
    publish_date TIMESTAMPTZ NOT NULL,
    last_revise_date TIMESTAMPTZ NOT NULL,
    series_id INTEGER REFERENCES series(id),
    series_index INTEGER
);

CREATE FUNCTION series_id_and_index_guard() RETURNS trigger AS $series_id_and_index_guard$
    BEGIN
        IF (NEW.series_id IS NULL AND NEW.series_index IS NOT NULL) OR (New.series_id IS NOT NULL AND NEW.series_index IS NULL) THEN
            RAISE EXCEPTION '''series_id'' and ''series_index'' must be both null or not null';
        END IF;

        RETURN NEW;
    END;
$series_id_and_index_guard$ LANGUAGE plpgsql;

CREATE TRIGGER series_id_and_index_guard BEFORE INSERT OR UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION series_id_and_index_guard();
