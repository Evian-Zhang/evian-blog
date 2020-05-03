import action

import os
import json
import uuid
import shutil
import re
import toml

# base_url SHOULD end with '/'
def process_img(current_dir, target_dir, base_url):
    def process_img_group(matchobj):
        img_relative_path = matchobj.group(2)
        if not img_relative_path.startswith("http"):
            image_path = os.path.join(current_dir, img_relative_path)
            print(f"Processing image {image_path}...")
            uuid_name = str(uuid.uuid4())
            extension = os.path.splitext(image_path)[1]
            target_path = f"{os.path.join(target_dir, uuid_name)}{extension}"
            try:
                shutil.copy(image_path, target_path)
                print(f"Move {image_path} to {target_path}")
                return f"{matchobj.group(1)}({base_url}{uuid_name}{extension})"
            except:
                print(f"Can't move {image_path} to {target_path}")
                raise Exception()
        else:
            return matchobj.group(0)
    return process_img_group

def process_file(dir_path, file_name, target_article_dir, target_img_dir, base_url):
    if file_name.endswith(".json"):
        article_path = os.path.join(dir_path, file_name)
        print(f"Processing article {article_path}...")
        with open(article_path, encoding='utf-8') as article_fd:
            article = json.loads(article_fd.read())
        article_body_path = os.path.join(dir_path, f'{article["title"]}.md')
        if os.path.exists(article_body_path):
            with open(article_body_path, encoding='utf-8') as article_body_fd:
                body = article_body_fd.read()
            body = re.sub(r'(!\[.*?\])\((.*?)\)', process_img(dir_path, target_img_dir, base_url), body)
            article["body"] = body
            target_article_path = os.path.join(target_article_dir, f'{article["title"]}.json')
            with open(target_article_path, 'w+', encoding='utf-8') as target_article:
                target_article.write(json.dumps(article, ensure_ascii=False))
                print(f"Successfully write to {target_article_path}")
        else:
            print(f"Can't find {article_body_path}")

if __name__ == '__main__':
    config_path = "config.toml"
    config = toml.load(config_path)
    articles_dir = config["articles_dir"]
    target_article_dir = config["target_article_dir"]
    target_img_dir = config["target_img_dir"]
    base_url = config["base_url"]
    article_paths = os.listdir(articles_dir)
    for article_path in article_paths:
        article_absolute_path = os.path.join(articles_dir, article_path)
        if os.path.isdir(article_absolute_path):
            sub_article_paths = os.listdir(article_absolute_path)
            for sub_article_path in sub_article_paths:
                process_file(article_absolute_path, sub_article_path, target_article_dir, target_img_dir, base_url)
        else:
            process_file(articles_dir, article_path, target_article_dir, target_img_dir, base_url)