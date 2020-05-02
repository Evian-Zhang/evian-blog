import requests
import toml
import base64
import json

class Neo4jClient:
    def __init__(self, config_file_path):
        with open(config_file_path, 'r') as config_file:
            config_str = config_file.read()
            config = toml.loads(config_str)
            self.url = f'http://{config["address"]}:{config["port"]}/db/{config["database_name"]}/tx/commit/'
            self.authorization = str(base64.b64encode(f'{config["username"]}:{config["password"]}'.encode("utf-8")), "utf-8")
            self.headers = {"Content-Type": "application/json", "Authorization": self.authorization}
        self.create_with_series_statement = """
        MERGE (article:Article {{title: $title}})
        SET article.body = $body, article.publish_date = $publish_date, article.last_revise_date = $last_revise_date
        MERGE (series:Series {{name: $series_name}})
        CREATE (article)-[:IN_SERIES {{index: $series_index}}]->(series)
        WITH article
        UNWIND $tag_names AS tag_name
        MERGE (tag:Tag {{name: tag_name}})
        CREATE (article)-[:HAS_TAG]->(tag)
        """
        self.create_without_series_statement = """
        MERGE (article:Article {{title: $title}})
        SET article.body = $body, article.publish_date = $publish_date, article.last_revise_date = $last_revise_date
        WITH article
        UNWIND $tags AS tag_name
        MERGE (tag:Tag {{name: tag_name}})
        CREATE (article)-[:HAS_TAG]->(tag)
        """
    
    def post_article(self, article):
        print(f'Posting {article["title"]}...')
        if "series_name" in article:
            statement = self.create_with_series_statement
        else:
            statement = self.create_without_series_statement
        body = {"statements": [{"statement": statement, "parameters": article}]}
        print("body: ")
        print(body)
        response = json.dumps(requests.post(self.url, data=body, headers=self.headers))
        print("response: ")
        print(response.content)

    def create_indices(self):
        print("Creating indices...")
        # About index for ORDER BY, see https://github.com/neo4j/issues/6584
        statement_list = [
            "CREATE INDEX article_title FOR (article:Article) ON article.title",
            "CREATE INDEX article_last_revise_date FOR (article:Article) ON article.last_revise_date"
            "CREATE INDEX tag_name FOR (tag:Tag) ON tag.name"
            "CREATE INDEX series_name FOR (series:Series) ON series.name"
        ]
        statements = list(map(lambda statement: {"statement": statement}, statement_list))
        body = json.dumps({"statements": statements})
        print("body: ")
        print(body)
        response = requests.post(self.url, data=body, headers=self.headers)
        print("response: ")
        print(response.content)
