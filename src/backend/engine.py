from sql import sql_fetchAll
from decimal import Decimal
from whoosh.fields import *
from whoosh.index import *
from whoosh.qparser import QueryParser

###########################
######  Index Setup  ######
###########################

schema = Schema(title=TEXT(stored=True, field_boost=2.5), id=ID(stored=True), body=TEXT)
COCKTAIL_INDEX_PATH = os.path.join(os.path.dirname(__file__), "cocktail_index")
INGREDIENT_INDEX_PATH = os.path.join(os.path.dirname(__file__), "ingredient_index")
BRAND_INDEX_PATH = os.path.join(os.path.dirname(__file__), "brand_index")
COUNTRY_INDEX_PATH = os.path.join(os.path.dirname(__file__), "country_index")


# Query parser and intelligent search engine implementation

def runSearch(category=None, query=None, filterRules=None, count=None, page=None, pageSize=None):
    category = inferCategory(category, query, filterRules, count, page, pageSize)
    query = query if query else ""
    page = page if page else 1
    pageSize = pageSize if pageSize else 10
    count = count if count else 1000
    if page > (count // pageSize):
        page = 1

    allEntries = sql_fetchAll(category)
    if allEntries is None:
        return [{"error": "an sql access error occurred"}]

    ix = getIndex(category)

    results = []
    if query == "":
        results = allEntries
    elif ix is None:
        results = [x for x in allEntries if (query in x.get("name"))]
    else:
        with ix.searcher() as searcher:
            parser = QueryParser("body", ix.schema)
            pquery = parser.parse(query)
            res = searcher.search(pquery)
            resID = [int(x.get("id")) for x in res]
            results = [x for x in allEntries if (int(x.get("id")) in resID)]

    results = applyFilterRules(results, filterRules)

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


# Returns the correct index for the search category specified

def getIndex(category):
    try:
        if category == "COCKTAILS":
            return open_dir(COCKTAIL_INDEX_PATH)
        if category == "BRANDS":
            return open_dir(BRAND_INDEX_PATH)
        if category == "INGREDIENTS":
            return open_dir(INGREDIENT_INDEX_PATH)
        if category == "COUNTRIES":
            return open_dir(COUNTRY_INDEX_PATH)
    except Exception as e:
        print(e)
        return None

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
        if len(params) != 2:
            continue

        rex = re.compile(params[1])
        results = (x for x in results if (rex.search(x.get(params[0])) is not None))
    return results


# Decides the most likely intended search category based on given search parameters

def inferCategory(category=None, query=None, filterRules=None, count=None, page=None, pageSize=None):
    if category is not None:
        return category
    else:
        results = []
        try:
            ix1 = open_dir(COCKTAIL_INDEX_PATH)
            ix2 = open_dir(BRAND_INDEX_PATH)
            ix3 = open_dir(INGREDIENT_INDEX_PATH)
            ix4 = open_dir(COUNTRIES_INDEX_PATH)
        except Exception as e:
            print(e)
            ix1 = None
            ix2 = None
            ix3 = None
            ix4 = None

        if ix1 is None:
            r1 = []
        else:
            with ix1.searcher() as searcher:
                parser = QueryParser("body", ix1.schema)
                pquery = parser.parse(query)
                r1 = searcher.search(pquery)

        if ix2 is None:
            r2 = []
        else:
            with ix2.searcher() as searcher:
                parser = QueryParser("body", ix2.schema)
                pquery = parser.parse(query)
                r2 = searcher.search(pquery)

        if ix3 is None:
            r3 = []
        else:
            with ix3.searcher() as searcher:
                parser = QueryParser("body", ix3.schema)
                pquery = parser.parse(query)
                r3 = searcher.search(pquery)

        if ix4 is None:
            r4 = []
        else:
            with ix4.searcher() as searcher:
                parser = QueryParser("body", ix4.schema)
                pquery = parser.parse(query)
                r4 = searcher.search(pquery)

        # Someone better at python could probably make this cleaner

        mc = [None, True, True, True, True]
        if len(r1) > len(r2):
            mc[2] = False
        if len(r1) > len(r3):
            mc[3] = False
        if len(r1) > len(r4):
            mc[4] = False

        if len(r2) > len(r1):
            mc[1] = False
        if len(r2) > len(r3):
            mc[3] = False
        if len(r2) > len(r4):
            mc[4] = False

        if len(r3) > len(r1):
            mc[1] = False
        if len(r3) > len(r2):
            mc[2] = False
        if len(r3) > len(r4):
            mc[4] = False

        if len(r4) > len(r1):
            mc[1] = False
        if len(r4) > len(r2):
            mc[2] = False
        if len(r4) > len(r3):
            mc[3] = False

        if (mc[1]):
            return "COCKTAILS"
        if (mc[2]):
            return "BRANDS"
        if (mc[3]):
            return "INGREDIENTS"
        if (mc[4]):
            return "COUNTRIES"

    return "COCKTAILS"
