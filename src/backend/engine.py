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
    results = [x for x in allEntries if (query in x.get("name"))]

    results = results.applyFilterRules(results, filterRules)

    if count:
        results = results[0:count]
    trimmedResults = results[(page - 1) * pageSize: (page - 1) * pageSize + pageSize]

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

# Applies a set of filtering and sorting rules to the result set


def applyFilterRules(results, filterRules):
    if filterRules is None:
        return results

    sortString = ""
    if filterRules.startswith("s"):
        sortString = sortString[sortString.find("(") + 1:sortString.find(")")]
        filterRules = filterRules[filterRules.find(")") + 1:]

    filterString = ""
    if filterRules.startswith("f"):
        filterString = filterString[2:]

    print("sort: " + sortString)
    print("filter: " + filterString)

    results = applyFilter(results, filterString)
    results = applySort(results, sortString)
    return results

# Sorts results by a given sorting rule


def applySort(results, sortString):
    sortField = sortString[sortString.find("[") + 1:sortString.find("]")]
    sortString = sortString[sortString.find("]") + 2:]
    sortMode = sortString[0]

    results = sorted(results, key=lambda item: item.get(sortField), reverse=(sortMode == "d"))
    return results

# Filters results by a given set of filtering rules


def applyFilter(results, filterString):
    rules = filterString.split("-")
    for r in rules:
        params = r[2:-2].split("][")
        if len(params) != 3:
            continue
        if params[1] == "m":
            try:
                results = (x for x in results if x.get(params[0]) == params[2])
            except Exception as e:
                pass
        else if params[1] == "e":
            try:
                print("equations not yet supported")
            except Exception as e:
                pass
        else if params[1] == "s":
            try:
                results = (x for x in results if x.get(params[0]).startswith(params[2]))
            except Exception as e:
                pass
    return results


# Decides the most likely intended search category based on given search parameters
def inferCategory(category=None, query=None, filterRules=None, count=None, page=None, pageSize=None):
    if category is not None:
        return category
    else:
        # implement this
        return "COCKTAILS"
