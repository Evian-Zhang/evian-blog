CREATE TABLE `tag_with_articles` (
    `tag_id` INTEGER REFERENCES `tags`(`id`) ON DELETE CASCADE,
    `article_id` INTEGER REFERENCES `articles`(`id`) ON DELETE CASCADE,
    PRIMARY KEY (`tag_id`, `article_id`)
);