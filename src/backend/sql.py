
from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import create_engine
import itertools

# Low-level python wrapper around our database

#engine = create_engine('mysql+mysqldb://root:tipsymix@/tipsy_backend?unix_socket=/cloudsql/tipsymix-ttp:tipsy-db')

cnx = mysql.connector.connect(user='root', password='tipsymix',
                              host='127.0.0.1',
                              database='tipsy_backend')
c = cnx.cursor()
#db = engine.connect()

# SELECT query
# 	+ SELECT select_q FROM from_q WHERE where_q
def sql_select(select_q, from_q, where_q):
    qString = "SELECT "+str(select_q)+" FROM "+str(from_q)
    if(where_q is not None):
        qString += " WHERE "+str(where_q)
	result = db.execute(qString)
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
