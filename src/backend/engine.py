from sql import sql_fetchAll
from decimal import Decimal

# Query parser and intelligent search engine implementation
def runSearch(category=None, query=None, filterRules=None, count=None, page=None, pageSize=None):
    category = inferCategory(category, query, filterRules, count, page, pageSize)
    page = page if page else 1
    pageSize = pageSize if pageSize else 10
    count = count if count else 1000
    if page > (count // pageSize):
        page = 1

    allEntries = sql_fetchAll(category)

    query = query if query else ""
    results = [x for x in allEntries if (query in x.get("name"))]   #&& checkFilterRules(x, filterRules))]

    if count:
        results = results[0:count]
    trimmedResults = results[(page - 1) * pageSize : (page - 1) * pageSize + pageSize]

    # Need to remove decimals (JSON doesn't like them)
    cleaned_results = []
    for result in trimmedResults:
        cleaned_result = {}
        for key in result:
            if isinstance(result[key], Decimal):
                cleaned_result[key] = str(result[key])
            else:
                cleaned_result[key] = result[key]
        cleaned_results.append(cleaned_result)

    return {
        "category": category,
        "query": query,
        "filter": filterRules,
        "totalCount": len(results),
        "totalPages": -(-len(results) // pageSize), # upside-down floor division
        "count": len(trimmedResults),
        "page": page,
        "results": cleaned_results
    }

# Decides the most likely intended search category based on given search parameters
def inferCategory(category=None, query=None, filterRules=None, count=None, page=None, pageSize=None):
    if category is not None:
        return category
    else:
        # implement this
        return "COCKTAILS"