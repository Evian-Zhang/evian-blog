import action

import os
import json
import uuid
import shutil
import re

# base_url SHOULD end with '/'
def process_img(current_dir, target_dir, base_url):
    def process_img_group(matchobj):
        img_relative_path = matchobj.group(2)
        if not img_relative_path.startswith("http"):
            image_path = os.path.join(current_dir, image_path)
            print(f"Processing {image_path}...")
            uuid_name = str(uuid.uuid4())
            target_path = os.path.join(target_dir, uuid_name)
            try:
                shutil.copy(image_path, target_path)
                print(f"Move {image_path} to {target_path}")
                return f"{matchobj.group(1)}[{base_url}uuid_name]"
            except:
                print(f"Can't move {image_path} to {target_path}")
                raise Exception()
    return process_img_group

if __name__ == '__main__':
    articles_dir = "."
    target_dir = "./img"
    base_url = "https://localhost/img/"
    article_paths = os.listdir(articles_dir)
    for article_path in article_paths:
        if article_path.endswith(".json"):
            print(f"Processing {article_path}...")
            with open(article_path) as article_fd:
                article = json.loads(article_fd.read())
            article_body_path = f'{article["title"]}.md'
            if os.path.exists(article_body_path):
                with open(article_body_path) as article_body_fd:
                    body = article_body_fd.read()
                body = re.sub(r'(!\(.*?\))\[(.*?)\]', process_img(articles_dir, target_dir, base_url), body)
            else:
                print(f"Can't find {article_body_path}")