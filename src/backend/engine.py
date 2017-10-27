from sql import sql_fetchAll

# Query parser and intelligent search engine implementation

def runSearch(category, query, filterRules, count, page, pageSize):
    category = inferCategory(category, query, filterRules, count, page, pageSize)
    page = page if page else 1
    pageSize = pageSize if pageSize else 10
    count = count if count else 1000
    if page > (count // pageSize):
        page = 1

    allEntries = sql_fetchAll(category)
    query = query if query else ""
    results = [x for x in allEntries if ((query in x.get("name")))]         #&& checkFilterRules(x, filterRules))]
    if count:
        results = results[0:count]
    trimmedResults = results[(page-1)*pageSize: (page-1)*pageSize + pageSize]

    return {
        "category": category,
        "query": query,
        "filter": filterRules,
        "totalCount": len(results),
        "totalPages": len(trimmedResults)//pageSize,
        "count": len(trimmedResults)-((page-1)*pageSize),
        "page": page,
        "results": trimmedResults
    }

# Decides the most likely intended search category based on given search parameters
def inferCategory(category, query, filterRules, count, page, pageSize):
    if category is not None:
        return category
    else:
        # implement this
        return "COCKTAIL"