CREATE TABLE tag_with_articles (
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
    PRIMARY KEY (tag_id, article_id)
);

CREATE FUNCTION tags_article_count_add_guard() RETURNS trigger AS $tags_article_count_add_guard$
    BEGIN
        UPDATE tags
        SET article_count = new_count
        FROM
        (SELECT
            COUNT(*) AS new_count
        FROM
            tag_with_articles
        WHERE
            tag_with_articles.tag_id = NEW.tag_id) t
        WHERE tags.id = NEW.tag_id;
        
        RETURN NEW;
    END;
$tags_article_count_add_guard$ LANGUAGE plpgsql;

CREATE FUNCTION tags_article_count_delete_guard() RETURNS trigger AS $tags_article_count_delete_guard$
    BEGIN
        UPDATE tags
        SET article_count = new_count
        FROM
        (SELECT
            COUNT(*) AS new_count
        FROM
            tag_with_articles
        WHERE
            tag_with_articles.tag_id = OLD.tag_id) t
        WHERE tags.id = OLD.tag_id;
        
        RETURN OLD;
    END;
$tags_article_count_delete_guard$ LANGUAGE plpgsql;

CREATE TRIGGER tags_article_count_add_guard AFTER INSERT ON tag_with_articles
    FOR EACH ROW EXECUTE FUNCTION tags_article_count_add_guard();

CREATE TRIGGER tags_article_count_delete_guard AFTER DELETE ON tag_with_articles
    FOR EACH ROW EXECUTE FUNCTION tags_article_count_delete_guard();