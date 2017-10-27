import itertools
import os
import mysql.connector

# Low-level python wrapper around our database

CLOUDSQL_CONNECTION_NAME = os.environ.get('CLOUDSQL_CONNECTION_NAME')
CLOUDSQL_USER = os.environ.get('CLOUDSQL_USER')
CLOUDSQL_PASSWORD = os.environ.get('CLOUDSQL_PASSWORD')


def connect_to_cloudsql():
    # When deployed to App Engine, the `SERVER_SOFTWARE` environment variable
    # will be set to 'Google App Engine/version'.
    if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
        # Connect using the unix socket located at
        # /cloudsql/cloudsql-connection-name.
        cloudsql_unix_socket = os.path.join(
            '/cloudsql', CLOUDSQL_CONNECTION_NAME)

        db = mysql.connector.connect(
            unix_socket=cloudsql_unix_socket,
            user=CLOUDSQL_USER,
            passwd=CLOUDSQL_PASSWORD)

    # If the unix socket is unavailable, then try to connect using TCP. This
    # will work if you're running a local MySQL server or using the Cloud SQL
    # proxy, for example:
    #
    #   $ cloud_sql_proxy -instances=your-connection-name=tcp:3306
    #
    else:
        db = mysql.connector.connect(
            host='127.0.0.1', user=CLOUDSQL_USER, passwd=CLOUDSQL_PASSWORD)
    return db

db = connect_to_cloudsql()
cursor = db.cursor()

# SELECT query
# 	+ SELECT select_q FROM from_q WHERE where_q
def sql_select(select_q, from_q, where_q):
    qString = "SELECT "+str(select_q)+" FROM "+str(from_q)
    if (where_q is not None):
        qString += " WHERE "+str(where_q)
    result = cursor.execute(qString)
    desc = result.description
    col_names = [col[0] for col in desc]
    return [dict(itertools.izip(col_names, x)) for x in result.fetchAll()]

# Fetch all instances of a class
def sql_fetchAll(category):
    return sql_select("*", category.upper(), None)

# Utility method to return the name of the many-to-many linking tables
def getLinkTableName(table1, table2):
    if table1 == "COCKTAIL":
        return table1 + "_" + table2
    if table1 == "INGREDIENT":
        if table2 != "COCKTAIL":
            return table1 + "_" + table2
    if table1 == "BRAND":
        if table2 == "COUNTRY":
            return table1 + "_" + table2
    return table2 + "_" + table1
