import toml
import requests
import json

def post(url: str, data: str):
    body = data
    print("body: ")
    print(body)
    response = requests.post(url, data=body.encode('utf-8'), headers={'Content-Type': 'application/json'})
    print("response: ")
    print(response.text)

class Poster:
    def __init__(self, config_file_path: str):
        with open(config_file_path, 'r') as config_file:
            self.api = toml.loads(config_file.read())

    def post_article(self, article: dict):
        post(self.api["post_article"], json.dumps(article, ensure_ascii=False))
    
    def post_project(self, project: dict):
        post(self.api["post_project"], json.dumps(project, ensure_ascii=False))

    def post_resume(self, resume: str):
        post(self.api["post_resume"], resume)