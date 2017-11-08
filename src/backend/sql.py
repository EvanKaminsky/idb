import itertools
import os
import MySQLdb
import MySQLdb.cursors

# Low-level python wrapper around our database

CLOUDSQL_CONNECTION_NAME = os.environ.get('CLOUDSQL_CONNECTION_NAME')
CLOUDSQL_USER = os.environ.get('CLOUDSQL_USER')
CLOUDSQL_PASSWORD = os.environ.get('CLOUDSQL_PASSWORD')


# MySqlDb wrapper to allow proper connections and reconnections to GCSQL
#   in both production and local environments

class DB:
    conn = None

    def connect(self):
        self.conn = self.connect_to_cloudsql()

    def query(self, sql):
        try:
            cursor = self.conn.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute(sql)
        except (AttributeError, MySQLdb.OperationalError):
            self.connect()
            cursor = self.conn.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute(sql)
        return cursor

    def connect_to_cloudsql(self):
        # When deployed to App Engine, the `SERVER_SOFTWARE` environment variable
        # will be set to 'Google App Engine/version'.
        if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
            # Connect using the unix socket located at
            # /cloudsql/cloudsql-connection-name.
            cloudsql_unix_socket = os.path.join(
                '/cloudsql', CLOUDSQL_CONNECTION_NAME)

            db = MySQLdb.connect(
                unix_socket=cloudsql_unix_socket,
                user=CLOUDSQL_USER,
                passwd=CLOUDSQL_PASSWORD,
                db='tipsy_backend')

        # If the unix socket is unavailable, then try to connect using TCP. This
        # will work if you're running a local MySQL server or using the Cloud SQL
        # proxy, for example:
        #
        #   $ cloud_sql_proxy -instances=your-connection-name=tcp:3306
        #
        else:
            db = MySQLdb.connect(
                host='127.0.0.1', user='root', passwd='tipsymix', db='tipsy_backend')
        return db

# SELECT query
#   + SELECT select_q FROM from_q WHERE where_q

def sql_select(select_q, from_q, where_q=None):
    db = DB()
    qString = "SELECT " + str(select_q) + " FROM " + str(from_q)
    if where_q is not None:
        qString += " WHERE " + str(where_q)

    try:
        cursor = db.query(qString)
        result = [dict(x) for x in cursor.fetchall()]
        cursor.close()
        return result
    except Exception as e:
        # print(e)
        return None


# Fetch all instances of a class

def sql_fetchAll(category):
    return sql_select("*", category.upper(), None)


# Describe a table

def sql_describe(category):
    db = DB()
    qString = "DESCRIBE " + str(category)
    try:
        cursor = db.query(qString)
        result = [dict(x) for x in cursor.fetchall()]
        cursor.close()
        return result
    except Exception as e:
        # print(e)
        return None


# Describe a table, only return its column names and types

def sql_describe_simple(category):
    describe = sql_describe(category)
    if describe is None:
        return [{"error": "an sql access error occurred"}]
    desiredFields = ["Field", "Type"]
    results = [({y: x[y] for y in desiredFields}) for x in describe]
