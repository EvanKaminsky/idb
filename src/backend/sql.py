
# Low-level python wrapper around our database

# SELECT query
# 	+ SELECT select_q FROM from_q WHERE where_q
def sql_select(select_q, from_q, where_q):
	# implement this
	return {}

# Fetch all instances of a class
def sql_fetchAll(category):
	return sql_select(*, category.upper(), None)

# Utility method to return the name of the many-to-many linking tables
def getLinkTableName(table1, table2):
    if table1 == "COCKTAIL":
        return table1 + "_" + table2
    if table1 == "INGREDIENT"
        if table2 != "COCKTAIL":
            return table1 + "_" + table2
    if table1 == "BRAND":
        if table2 == "COUNTRY"
            return table1 + "_" + table2
    return table2 + "_" + table1