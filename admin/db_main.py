import action

import os
import json
import toml

if __name__ == '__main__':
    config_file_path = os.getenv("CONFIG_FILE")
    neo4j_client = action.Neo4jClient(config_file_path)
    neo4j_client.create_indices()
    config = toml.load(config_file_path)
    local_article_dir = config["local_article_dir"]
    for article_name in os.listdir(local_article_dir):
        article_path = os.path.join(local_article_dir, article_name)
        with open(article_path) as article_file:
            article = json.loads(article_file.read())
        neo4j_client.post_article(article)