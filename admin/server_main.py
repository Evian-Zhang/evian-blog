import argparse
from enum import Enum
import json

from poster import Poster

class PostType(Enum):
    Article = 1
    Project = 2
    Resume = 3

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("-c", "--config", help="path of config toml file")
    parser.add_argument("-t", "--type", help="type of post")
    parser.add_argument("file", help="path of input json")

    args = parser.parse_args()

    config = "config.toml"
    if args.config:
        config = args.config
    
    post_type = PostType.Article
    if args.type == "project":
        post_type = PostType.Project
    elif args.type == "resume":
        post_type = PostType.Resume

    with open(args.file, "r") as input_file:
        if post_type == PostType.Resume:
            content = input_file.read()
        else:
            json_content = input_file.read()
            content = json.loads(json_content)
        poster = Poster(config)
        if post_type == PostType.Article:
            poster.post_article(content)
        elif post_type == PostType.Project:
            poster.post_project(content)
        elif post_type == PostType.Resume:
            poster.post_project(content)
