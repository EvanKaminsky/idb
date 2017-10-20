
# Query parser and intelligent search engine implementation

def runSearch(category, query, filterRules, count, page, pageSize)
	category = inferCategory(category, query, filterRules, count, page, pageSize)
    # implement this

	return {}

# Decides the most likely intended search category based on given search parameters
def inferCategory(category, query, filterRules, count, page, pageSize):
    if category not is None:
        return category
    else
        # implement this
        return "cmon"