import requests
import json
import html2text

def request_article(article_id):
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'}
    target_url = 'https://api.zhihu.com/articles/' + article_id
    response = requests.get(target_url, headers=headers)
    if response.status_code != 200:
        raise Exception('Can\'t get '+ target_url + ' return status code: ' + str(response.status_code))
    return json.loads(response.text)

def process_body(body):
    text_maker = html2text.HTML2Text()
    return text_maker.handle(body)

def save_article_info(base_url, raw_info, body):
    article_info = {}
    article_info['title'] = raw_info['title']
    article_info['publish_date'] = raw_info['created']
    with open(base_url + article_info['title'] + '.md', 'w+') as md_file:
        md_file.write(body)
    with open(base_url + article_info['title'] + '.json', 'w+') as json_file:
        json_file.write(json.dumps(article_info))

# article = request_article('112605363')
# body = process_body(article['content'])
# save_article_info('/home/evian/Downloads/test/', article, body)