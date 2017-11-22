from sql import sql_fetchAll
from decimal import Decimal
from whoosh.fields import *
from whoosh.index import *
from whoosh.qparser import MultifieldParser
from whoosh.analysis import StemmingAnalyzer
import whoosh.highlight as highlight


###########################
######  Index Setup  ######
###########################

ana = StemmingAnalyzer(minsize=1)
schema = Schema(name=TEXT(stored=True, field_boost=2.5, analyzer=ana), id=ID(stored=True), description=TEXT(stored=True, analyzer=ana), summary=TEXT(stored=True, field_boost=1.3, analyzer=ana), tags=TEXT(stored=False, field_boost=2, analyzer=ana))
COCKTAIL_INDEX_PATH = os.path.join(os.path.dirname(__file__), "cocktail_index")
INGREDIENT_INDEX_PATH = os.path.join(os.path.dirname(__file__), "ingredient_index")
BRAND_INDEX_PATH = os.path.join(os.path.dirname(__file__), "brand_index")
COUNTRY_INDEX_PATH = os.path.join(os.path.dirname(__file__), "country_index")


##########################
######  Highlighter ######
##########################

NUM_TERMS_MAX = 5
HIGHLIGHT_TAG = "mark"
SURROUND_CHAR_MAX = 200


#############################
######  Search Engine  ######
#############################

# Query parser and intelligent search engine implementation

def runSearch(category=None, query=None, filterRules=None, count=None, page=None, pageSize=None):

    ### Compute non-provided values ###

    category = inferCategory(category, query, filterRules, count, page, pageSize)
    query = query.decode("utf-8", "ignore") if query else "".decode("utf-8", "ignore")
    page = page if page else 1
    pageSize = pageSize if pageSize else 10
    count = count if count else 1000
    if page > (count // pageSize):
        page = 1

    ### Fetch All Instances ###

    allEntries = sql_fetchAll(category)
    if allEntries is None:
        return [{"error": "an sql access error occurred"}]

    ### Apply Search Algorithm ###

    ix = getIndex(category)

    results = []
    if len(list(ana(query))) == 0:
        results = allEntries
    elif ix is None:
        results = [x for x in allEntries if (query in x.get("name"))]
    else:

        ### Use Search Index ###

        with ix.searcher() as searcher:
            parser = MultifieldParser(["name", "description", "summary", "tags"], ix.schema)
            pquery = parser.parse(query)
            res = searcher.search(pquery)
            res.fragmenter.surround = SURROUND_CHAR_MAX
            fmt = SpanFormatter()
            res.formatter = fmt
            resID = [int(x.get("id")) for x in res]
            results = [x for x in allEntries if (int(x.get("id")) in resID)]
            for r in results:
                for x in res:
                    if int(r.get("id")) == int(x.get("id")):
                        summaryHighlights = x.highlights("summary", top=NUM_TERMS_MAX)
                        descHighlights = x.highlights("description", top=NUM_TERMS_MAX)
                        highlights = ""
                        if summaryHighlights == "":
                            if descHighlights == "":
                                highlights = r.get("summary")
                            else:
                                highlights = descHighlights
                        else:
                            highlights = summaryHighlights

                        r.update({"highlights": highlights})

    ### Sort and Filter Results ###

    results = list(applyFilterRules(results, filterRules))

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
        sortString = filterRules[filterRules.find("(") + 1:filterRules.find(")")]
        filterRules = filterRules[filterRules.find(")") + 1:]

    filterString = ""
    if filterRules.startswith("f"):
        filterString = filterRules[2:]

    print("sort: " + sortString)
    print("filter: " + filterString)

    results = applyFilter(results, filterString)
    results = applySort(results, sortString)
    return results


# Sorts results by a given sorting rule

def applySort(results, sortString):
    sortField = sortString[sortString.find("[") + 1:sortString.find("]")]
    sortString = sortString[sortString.find("]") + 2:]
    if (sortString is None or len(sortString) == 0):
        #default to returning as-is in case the regex fails
        return results
    else:
        sortMode = sortString[0]
        results = sorted(results, key=lambda item: item.get(sortField), reverse=(sortMode == "d"))
        return results


# Filters results by a given set of filtering rules

def applyFilter(results, filterString):
    rules = filterString.split(")-(")
    rules[0] = rules[0][1:]
    rules[-1] = rules[-1][0:-1]
    for r in rules:
        r = r[1:-1]
        p1 = r[0:r.find("]")]
        p2 = r[r.find("[") + 1:]

        rex = re.compile(p2)
        results = (x for x in results if (rex.search(x.get(p1)) is not None))
    return results


# Decides the most likely intended search category based on given search parameters

def inferCategory(category=None, query=None, filterRules=None, count=None, page=None, pageSize=None):
    if category is not None:
        return category
    elif query is None:
        return "COCKTAILS"
    else:
        results = []
        try:
            ix1 = open_dir(COCKTAIL_INDEX_PATH)
            ix2 = open_dir(BRAND_INDEX_PATH)
            ix3 = open_dir(INGREDIENT_INDEX_PATH)
            ix4 = open_dir(COUNTRY_INDEX_PATH)
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
                r1 = len(searcher.search(pquery))

        if ix2 is None:
            r2 = []
        else:
            with ix2.searcher() as searcher:
                parser = QueryParser("body", ix2.schema)
                pquery = parser.parse(query)
                r2 = len(searcher.search(pquery))

        if ix3 is None:
            r3 = []
        else:
            with ix3.searcher() as searcher:
                parser = QueryParser("body", ix3.schema)
                pquery = parser.parse(query)
                r3 = len(searcher.search(pquery))

        if ix4 is None:
            r4 = []
        else:
            with ix4.searcher() as searcher:
                parser = QueryParser("body", ix4.schema)
                pquery = parser.parse(query)
                r4 = len(searcher.search(pquery))

        # Find the variable containing the longest array, and return a string
        #    corresponding to it

        # This is done by eliminating the arrays failing the maximality condition

        mc = [None, True, True, True, True]
        if (r1) > (r2):
            mc[2] = False
        if (r1) > (r3):
            mc[3] = False
        if (r1) > (r4):
            mc[4] = False

        if (r2) > (r1):
            mc[1] = False
        if (r2) > (r3):
            mc[3] = False
        if (r2) > (r4):
            mc[4] = False

        if (r3) > (r1):
            mc[1] = False
        if (r3) > (r2):
            mc[2] = False
        if (r3) > (r4):
            mc[4] = False

        if (r4) > (r1):
            mc[1] = False
        if (r4) > (r2):
            mc[2] = False
        if (r4) > (r3):
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


# Custom Search Engine text formatter

class SpanFormatter(highlight.Formatter):
    def format_token(self, text, token, replace=False):
        tokentext = highlight.get_text(text, token, replace)
        return "<" + str(HIGHLIGHT_TAG) + ">" + tokentext + "</" + str(HIGHLIGHT_TAG) + ">"
        #return tokentext.upper()
