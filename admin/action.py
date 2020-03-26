import toml
import psycopg2
import datetime

def read_conf(config_path):
    with open(config_path, 'r') as config_file:
        return toml.load(config_file)

# must commit and close after use
# exiting the connection's `with` block doesn't close the connection, should be put into a `try-catch` block to ensure close
def establish_connection(config):
    return psycopg2.connect(host=config['address'], port=config['port'], user=config['username'], password=config['password'], database=config['database_name'])

def add_tag(cursor, tag_name):
    cursor.execute("""
    INSERT INTO tags (name, article_count) VALUES (%s, 0);
    """,
    (tag_name,)) # Python requires a comma to create a signle element tuple

def remove_tag(cursor, tag_name):
    cursor.execute("""
    DELETE FROM tags WHERE name = %s;
    """,
    (tag_name, ))

def add_series(cursor, series_name):
    cursor.execute("""
    INSERT INTO series (name) VALUES (%s);
    """,
    (series_name,))

def remove_series(cursor, series_name):
    cursor.execute("""
    DELETE FROM series WHERE name = %s;
    """,
    (series_name,))

def add_article_without_tag_and_series(cursor, title, body, publish_date):
    cursor.execute("""
    INSERT INTO articles (title, body, publish_date)
    VALUES (%s, %s, %s)
    RETURNING id;
    """,
    (title, body, publish_date))
    return cursor.fetchone()    

def add_tags_of_article(cursor, article_id, tags):
    # `ANY` can work with empty lists, wheras `IN()` is a SQL syntax error
    cursor.execute("""
    INSERT INTO tag_with_articles (tag_id, article_id)
    SELECT tags.id, %s FROM tags
    WHERE tags.name = ANY(%s);
    """,
    (article_id, tags))

def remove_tag_of_article(cursor, article_title, tag_name):
    cursor.execute("""
    SELECT tags.id, articles.id
    FROM tags
    INNER JOIN articles
    ON (tags.name = %s AND articles.title = %s)
    """)
    tag_id, article_id = cursor.fetchone()
    cursor.execute("""
    DELETE FROM tag_with_articles
    WHERE (tag_id = %s AND article_id = %s);
    """,
    (tag_id, article_id))

def add_series_of_article(cursor, article_id, series_id, series_index):
    cursor.execute("""
    UPDATE articles
    SET series_id = %s, series_index = %s
    WHERE id = %s;
    """,
    (series_id, series_index, article_id))
    

# config = read_conf('config.toml')
# connection = establish_connection(config)
# try:
#     with connection:
#         with connection.cursor() as cursor:
#             # add_tag(cursor, 'mac')
#             # article_id = add_article_without_tag_and_series(cursor, "my-title", "my body", datetime.datetime.now())
#             add_tags_of_article(cursor, 1, ['mac'])
# finally:
#     connection.close()
