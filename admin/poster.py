import datetime
import action

def save_article(cursor, body, info):
    title = info['title']
    publish_date = datetime.datetime.fromtimestamp(info['publish_date'])
    action.save_article_without_tag_and_series(cursor, title, body, publish_date)

