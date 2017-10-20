import engine
from sql import sql_select
from sql import getLinkTableName

# Set of python implementations of api calls
# The return format is JSON objects (python dictionaries/lists) as defined in apiary
# Author: Balazs

###################
###  Constants  ###
###################

DEFAULT_CARD_COLOR = 0x5ff442

#########################
## API Implementation  ##
#########################

# /api/search
#   + category (?string) - Type of model to search for (empty = intelligent search)
#   + query (?string) - Search query to run
#   + filterRules (?string) - How to filter the results
#   + count (?int) - How many results to create
#   + page (?int) - What page of the results to return
#   + pagesize (?int) - Number of results per page
def search(category, query, filterRules, count, page, pageSize):
    return engine.runSearch(category, query, filterRules, count, page, pageSize)

# /api/cocktails/{slug}
#   + slug (string) - identifier for detail page, either an ID number or standardized name
def cocktailDetail(slug):
    cocktailID = 0
    try:
        cocktailID = int(slug)
    except Exception as e:
        cocktailID = idLookup(slug, "COCKTAIL")
    data = fetchCocktail(cocktailID)
    if data is None:
        return {"error": "cocktail not found"}
    stdname = data.get("stdname")
    if stdname is None:
        return {"error": "name not found"}

    name = data.get("name", stdname.capitalize())
    image = data.get("imageurl", "")
    color = int(data.get("color", inferColor(image)))
    description = data.get("description", "")
    abv = float(scrapeABV(description))
    video = data.get("videourl", "")
    garnish = scrapeGarnish(description)
    glass = scrapeGlass(description)
    spirit = scrapeSpirit(description)
    preparation = scrapePreparation(description)
    instructions = scrapeInstructions(description)

    brands = [brandLinkdataQuery(ID) for ID in brandsInCocktailQuery(cocktailID)]
    ingredients = [ingredintLinkdataQuery(ID) for ID in ingredientsInCocktailQuery(cocktailID)]
    countries = [countryLinkdataQuery(ID) for ID in countriesInCocktailQuery(cocktailID)]

    tags = [tagQuery(ID) for ID in tagsInCocktailQuery(cocktailID)]

    return {
        "id": cocktailID,
        "stdname": stdname,
        "name": name,
        "image": image,
        "color": color,
        "description": description,
        "abv": abv,
        "video": video,
        "garnish": garnish,
        "glass": glass,
        "base_spirit": spirit,
        "preparation": preparation,
        "instructions": instructions,
        "ingredients": ingredients,
        "brands": brands,
        "countries": countries,
        "tags": tags
    }

# /api/ingredients/{slug}
#   + slug (string) - identifier for detail page, either an ID number or standardized name
def ingredientDetail(slug):
    ingredientID = 0
    try:
        ingredientID = int(slug)
    except Exception as e:
        ingredientID = idLookup(slug, "INGREDIENT")
    data = fetchIngredient(ingredientID)
    if data is None:
        return {"error": "ingredient not found"}
    stdname = data.get("stdname")
    if stdname is None:
        return {"error": "name not found"}

    name = data.get("name", stdname.capitalize())
    image = data.get("imageurl", "")
    color = int(data.get("color", inferColor(image)))
    description = data.get("description", "")
    abv = float(data.get("abv", "0.0"))

    brands = [brandLinkdataQuery(ID) for ID in brandsInIngredientQuery(ingredientID)]
    cocktails = [cocktailLinkdataQuery(ID) for ID in cocktailsInIngredientQuery(ingredientID)]
    countries = [countryLinkdataQuery(ID) for ID in countriesInIngredientQuery(ingredientID)]

    tags = [tagQuery(ID) for ID in tagsInIngredientQuery(ingredientID)]

    return {
        "id": ingredientID,
        "stdname": stdname,
        "name": name,
        "image": image,
        "color": color,
        "description": description,
        "abv": abv,
        "cocktails": cocktails,
        "brands": brands,
        "countries": countries,
        "tags": tags
    }

# /api/brands/{slug}
#   + slug (string) - identifier for detail page, either an ID number or standardized name
def brandDetail(slug):
    brandID = 0
    try:
        brandID = int(slug)
    except Exception as e:
        brandID = idLookup(slug, "BRAND")
    data = fetchBrand(brandID)
    if data is None:
        return {"error": "brand not found"}
    stdname = data.get("stdname")
    if stdname is None:
        return {"error": "name not found"}

    name = data.get("name", stdname.capitalize())
    image = data.get("imageurl", "")
    color = int(data.get("color", inferColor(image)))
    description = data.get("description", "")
    website = data.get("websiteurl", "")

    ingredients = [ingredientLinkdataQuery(ID) for ID in ingredientsInBrandQuery(brandID)]
    cocktails = [cocktailLinkdataQuery(ID) for ID in cocktailsInBrandQuery(brandID)]
    countries = [countryLinkdataQuery(ID) for ID in countriesInBrandQuery(brandID)]

    tags = [tagQuery(ID) for ID in tagsInBrandQuery(brandID)]

    return {
        "id": brandID,
        "stdname": stdname,
        "name": name,
        "image": image,
        "color": color,
        "description": description,
        "website": website,
        "cocktails": cocktails,
        "ingredients": ingredients,
        "countries": countries,
        "tags": tags
    }

# /api/countries/{slug}
#   + slug (string) - identifier for detail page, either an ID number or standardized name
def countryDetail(slug):
    countryID = 0
    try:
        countryID = int(slug)
    except Exception as e:
        countryID = idLookup(slug, "COUNTRY")
    data = fetchCountry(countryID)
    if data is None:
        return {"error": "brand not found"}
    stdname = data.get("stdname")
    if stdname is None:
        return {"error": "name not found"}

    name = data.get("name", stdname.capitalize())
    image = data.get("imageurl", "")
    color = int(data.get("color", inferColor(image)))
    description = data.get("description", "")
    continent = data.get("continent", "")

    ingredients = [ingredientLinkdataQuery(ID) for ID in ingredientsInCountryQuery(countryID)]
    cocktails = [cocktailLinkdataQuery(ID) for ID in cocktailsInCountryQuery(countryID)]
    brands = [brandLinkdataQuery(ID) for ID in brandsInCountryQuery(countryID)]

    tags = [tagQuery(ID) for ID in tagsInCountryQuery(countryID)]

    return {
        "id": countryID,
        "stdname": stdname,
        "name": name,
        "image": image,
        "color": color,
        "description": description,
        "continent": continent,
        "cocktails": cocktails,
        "brands": brands,
        "ingredients": ingredients,
        "tags": tags
    }

#######################
###  Helper Methods ###
#######################

# Infers a color for a card based on an image url
def inferColor(imageurl):
    return DEFAULT_CARD_COLOR

# Looks up the id number associated with a given standardized name
def idLookup(slug, type):
    # perform lookup
    return 1

# Looks up the standardized name associated with a given id number
def stdLookup(slug, type):
    # perform lookup
    return "test"


# Attempts to find the ABV of a cocktail from the description
def scrapeABV(description):
    return 0.0

# Attempts to find the garnish of a cocktail from the description
def scrapeGarnish(description):
    return ""

# Attempts to find the glass used for a cocktail from the description
def scrapeGlass(description):
    return ""

# Attempts to find the base spirit of a cocktail from the description
def scrapeSpirit(description):
    return ""

# Attempts to find the preparation style for a cocktail from the description
def scrapePreparation(description):
    return ""

# Attempts to find the mixing instructions of a cocktail from the description
def scrapeInstructions(description):
    return ""


#####################
### SQL Wrappers  ###
#####################

################### Link Data ###################

# returns the label, id, and url of a desired cocktail
def cocktailLinkdataQuery(ID):
    return sql_select("name AS label", "COCKTAIL", ID).update({"url": "tipsymix.com/api/cocktails/"+str(stdLookup(ID, "BRAND")), "id":ID})

# returns the label, id, and url of a desired brand
def brandLinkdataQuery(ID):
    return sql_select("name AS label", "BRAND", ID).update({"url": "tipsymix.com/api/brands/"+str(stdLookup(ID, "BRAND")), "id":ID})

# returns the label, id, and url of a desired ingredient
def ingredientLinkdataQuery(ID):
    return sql_select("name AS label", "INGREDIENT", ID).update({"url": "tipsymix.com/api/ingredients/"+str(stdLookup(ID, "BRAND")), "id":ID})

# returns the label, id, and url of a desired country
def countryLinkdataQuery(ID):
    return sql_select("name AS label", "COUNTRY", ID).update({"url": "tipsymix.com/api/countries/"+str(stdLookup(ID, "BRAND")), "id":ID})

################### In Cocktail ###################

# returns a list of brandIDs of brands linked to by a given cocktail
def brandsInCocktailQuery(ID):
    return [match.get("brandID") for match in sql_select("brandID", getLinkTableName("COCKTAIL", "BRAND"), "cocktailID = "+str(ID))]

# returns a list of ingredientIDs of ingredients linked to by a given cocktail
def ingredientsInCocktailQuery(ID):
    return [match.get("ingredientID") for match in sql_select("ingredientID", getLinkTableName("COCKTAIL", "INGREDIENT"), "cocktailID = "+str(ID))]

# returns a list of countryIDs of countries linked to by a given cocktail
def countriesInCocktailQuery(ID):
    return [match.get("countryID") for match in sql_select("countryID", getLinkTableName("COCKTAIL", "COUNTRY"), "cocktailID = "+str(ID))]

################### In Ingredient ###################

# returns a list of brandIDs of brands linked to by a given ingredient
def brandsInIngredientQuery(ID):
    return [match.get("brandID") for match in sql_select("brandID", getLinkTableName("INGREDIENT", "BRAND"), "ingredientID = "+str(ID))]

# returns a list of ingredientIDs of cocktails linked to by a given ingredient
def cocktailsInIngredientQuery(ID):
    return [match.get("cocktailID") for match in sql_select("cocktailID", getLinkTableName("INGREDIENT", "COCKTAIL"), "ingredientID = "+str(ID))]

# returns a list of countryIDs of countries linked to by a given ingredient
def countriesInIngredientQuery(ID):
    return [match.get("countryID") for match in sql_select("countryID", getLinkTableName("INGREDIENT", "COUNTRY"), "ingredientID = "+str(ID))]

################### In Brand ###################

# returns a list of ingredientIDs of ingredients linked to by a given brand
def ingredientsInBrandQuery(ID):
    return [match.get("ingredientID") for match in sql_select("ingredientID", getLinkTableName("BRAND", "INGREDIENT"), "brandID = "+str(ID))]

# returns a list of cocktailIDs of cocktails linked to by a given brand
def cocktailsInBrandQuery(ID):
    return [match.get("cocktailID") for match in sql_select("cocktailID", getLinkTableName("BRAND", "COCKTAIL"), "brandID = "+str(ID))]

# returns a list of countryIDs of countries linked to by a given brand
def countriesInBrandQuery(ID):
    return [match.get("countryID") for match in sql_select("countryID", getLinkTableName("BRAND", "COUNTRY"), "brandID = "+str(ID))]

################### In Country ###################

# returns a list of ingredientIDs of ingredients linked to by a given country
def ingredientsInCountryQuery(ID):
    return [match.get("ingredientID") for match in sql_select("ingredientID", getLinkTableName("COUNTRY", "INGREDIENT"), "countryID = "+str(ID))]

# returns a list of cocktailIDs of cocktails linked to by a given country
def cocktailsInCountryQuery(ID):
    return [match.get("cocktailID") for match in sql_select("cocktailID", getLinkTableName("COUNTRY", "COCKTAIL"), "countryID = "+str(ID))]

# returns a list of brandIDs of brands linked to by a given country
def brandsInCountryQuery(ID):
    return [match.get("brandID") for match in sql_select("brandID", getLinkTableName("COUNTRY", "BRAND"), "countryID = "+str(ID))]

###################### Tags ######################

# returns the list of tags associated with a given cocktail
def tagsInCocktailQuery(ID):
    return return [match.get("tagID") for match in sql_select("tagID", "COCKTAIL_TAGS", "cocktailID = "+str(ID))]

# returns the list of tags associated with a given brand
def tagsInBrandQuery(ID):
    return return [match.get("tagID") for match in sql_select("tagID", "BRAND_TAGS", "brandID = "+str(ID))]

# returns the list of tags associated with a given ingredient
def tagsInIngredientQuery(ID):
    return return [match.get("tagID") for match in sql_select("tagID", "INGREDIENT_TAGS", "ingredientID = "+str(ID))]

# returns the list of tags associated with a given country
def tagsInCountryQuery(ID):
    return return [match.get("tagID") for match in sql_select("tagID", "COUNTRY_TAGS", "countryID = "+str(ID))]

################ Instance Queries #################

# returns the cocktail instance for the given ID
def fetchCocktail(ID):
    sql_select("*", "COCKTAIL", "id = "+str(ID)).get(0)

# returns the ingredient instance for the given ID
def fetchIngredient(ID):
    sql_select("*", "INGREDIENT", "id = "+str(ID)).get(0)

# returns the brand instance for the given ID
def fetchBrand(ID):
    sql_select("*", "BRAND", "id = "+str(ID)).get(0)

# returns the country instance for the given ID
def fetchCountry(ID):
    sql_select("*", "COUNTRY", "id = "+str(ID)).get(0)