
import os

# The secret key is used by Flask to encrypt session cookies.
SECRET_KEY = 'secret'

DATA_BACKEND = 'CloudSQL'

PROJECT_ID = 'tipsymix-ttp'

CLOUDSQL_USER = 'root'
CLOUDSQL_PASSWORD = 'tipsymix-ttp'
CLOUDSQL_DATABASE = 'tipsy-db'

CLOUDSQL_CONNECTION_NAME = 'tipsymix-ttp:us-central1:tipsy-db'

LOCAL_SQLALCHEMY_DATABASE_URI = (
    'mysql+pymysql://{user}:{password}@127.0.0.1:3306/{database}').format(
        user=CLOUDSQL_USER, password=CLOUDSQL_PASSWORD,
        database=CLOUDSQL_DATABASE)

LIVE_SQLALCHEMY_DATABASE_URI = (
    'mysql+pymysql://{user}:{password}@localhost/{database}'
    '?unix_socket=/cloudsql/{connection_name}').format(
        user=CLOUDSQL_USER, password=CLOUDSQL_PASSWORD,
        database=CLOUDSQL_DATABASE, connection_name=CLOUDSQL_CONNECTION_NAME)

if os.environ.get('GAE_INSTANCE'):
    SQLALCHEMY_DATABASE_URI = LIVE_SQLALCHEMY_DATABASE_URI
else:
    SQLALCHEMY_DATABASE_URI = LOCAL_SQLALCHEMY_DATABASE_URI