DROP TRIGGER tags_article_count_add_guard ON tag_with_articles;
DROP TRIGGER tags_article_count_delete_guard ON tag_with_articles;
DROP FUNCTION tags_article_count_add_guard();
DROP FUNCTION tags_article_count_delete_guard();
DROP TABLE tag_with_articles;