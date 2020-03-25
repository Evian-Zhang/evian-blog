import toml
import psycopg2

def read_conf(config_path):
    with open(config_path, 'r') as config_file:
        return toml.load(config_file)

# must commit and close after use
# exiting the connection's `with` block doesn't close the connection, should be put into a `try-catch` block to ensure close
def establish_connection(config):
    return psycopg2.connect(host=config['address'], port=config['port'], user=config['username'], password=config['password'], database=config['database_name'])

def add_tag(cursor, tag_name):
    cursor.execute("""
    INSERT INTO tags (name) VALUES (%s);
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

def add_article(cursor, title, body, publish_date, tags, series=None):
    try:
        series_name, series_index = series
        destructure_success = True
    except:
        destructure_success = False
    if destructure_success:
        cursor.execute("""
        SELECT id FROM series WHERE name = %s;
        """,
        (series_name,))
        series_id = cursor.fetchone()
        if series_id == None:
            raise Exception("Series name not found for " + series_name)
        cursor.execute("""
        INSERT INTO tables (title, body, publish_date, last_revise_date, series_id, series_index)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id;
        """,
        (title, body, publish_date, publish_date, series_id, series_index))
    else:
        cursor.execute("""
        INSERT INTO tables (title, body, publish_date, last_revise_date)
        VALUES (%s, %s, %s, %s)
        RETURNING id;
        """,
        (title, body, publish_date, publish_date))
    article_id = cursor.fetchone()
    

    
    

# config = read_conf('config.toml')
# connection = establish_connection(config)
# try:
#     with connection:
#         with connection.cursor() as cursor:
#             add_tag(cursor, 'mac')
# finally:
#     connection.close()
