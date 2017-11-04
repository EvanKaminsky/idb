#from PIL import Image
#import urllib.request
import io

import engine
from sql import sql_select

# Set of python implementations of api calls
# The return format is JSON objects (python dictionaries/lists) as defined in apiary
# Author: Balazs

################c###
###  Constants  ###
###################

DEFAULT_CARD_COLOR = 0x5ff442

TABLE_COCKTAILS   = "COCKTAILS"
TABLE_INGREDIENTS = "INGREDIENTS"
TABLE_BRANDS      = "BRANDS"
TABLE_COUNTRIES   = "COUNTRIES"

# Tags Tables
TABLE_TAGS = "TAGS"
TABLE_TAGS_COCKTAIL   = "COCKTAIL_TAGS"
TABLE_TAGS_COUNTRY    = "COUNTRY_TAGS"
TABLE_TAGS_INGREDIENT = "INGREDIENT_TAGS"
TABLE_TAGS_BRAND      = "BRAND_TAGS"

# Link Tables
TABLE_BRAND_COUNTRY       = "BRAND_COUNTRY"
TABLE_COCKTAIL_BRAND      = "COCKTAIL_BRAND"
TABLE_COCKTAIL_COUNTRY    = "COCKTAIL_COUNTRY"
TABLE_COCKTAIL_INGREDIENT = "COCKTAIL_INGREDIENT"
TABLE_INGREDIENT_BRAND    = "INGREDIENT_BRAND"
TABLE_INGREDIENT_COUNTRY  = "INGREDIENT_COUNTRY"


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
    return engine.runSearch(category.capitalize(), query, filterRules, count, page, pageSize)

# /api/cocktails/{slug}
#   + slug (string) - identifier for detail page, either an ID number or standardized name
def cocktailDetail(slug):

    print("slug " + slug)

    cocktailID = 0
    try:
        cocktailID = int(slug)
    except Exception as e:
        cocktailID = idLookup(slug, TABLE_COCKTAILS)
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
    ingredients = [ingredientLinkdataQuery(ID) for ID in ingredientsInCocktailQuery(cocktailID)]
    countries = [countryLinkdataQuery(ID) for ID in countriesInCocktailQuery(cocktailID)]

    #tags = [tagQuery(ID) for ID in tagsInCocktailQuery(cocktailID)]

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
        "tags": 1 #tags
    }

# /api/ingredients/{slug}
#   + slug (string) - identifier for detail page, either an ID number or standardized name
def ingredientDetail(slug):
    ingredientID = 0
    try:
        ingredientID = int(slug)
    except Exception as e:
        ingredientID = idLookup(slug, TABLE_INGREDIENTS)
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

    #tags = [tagQuery(ID) for ID in tagsInIngredientQuery(ingredientID)]

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
        "tags": 1 #tags
    }

# /api/brands/{slug}
#   + slug (string) - identifier for detail page, either an ID number or standardized name
def brandDetail(slug):
    brandID = 0
    try:
        brandID = int(slug)
    except Exception as e:
        brandID = idLookup(slug, TABLE_BRANDS)
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

    #tags = [tagQuery(ID) for ID in tagsInBrandQuery(brandID)]

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
        "tags": 1 #tags
    }

# /api/countries/{slug}
#   + slug (string) - identifier for detail page, either an ID number or standardized name
def countryDetail(slug):
    countryID = 0
    try:
        countryID = int(slug)
    except Exception as e:
        countryID = idLookup(slug, TABLE_COUNTRIES)
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

    #tags = [tagQuery(ID) for ID in tagsInCountryQuery(countryID)]

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
        "tags": 1 #tags
    }

#######################
###  Helper Methods ###
#######################

# Infers a color for a card based on an image url
def inferColor(imageurl):
    #with urllib.request.urlopen(imageurl) as url:
    #    fileio = io.BytesIO(url.read())

    #try:
    #    img = Image.open(fileio)
    #    r, g, b = get_average_color(0,0,min(*im.size))
    #except Exception as e:
    return DEFAULT_CARD_COLOR
    #return ((r & 0xFF) << 16) + ((g & 0xFF) << 8) + (b & 0xFF) ;

# Returns a 3-tuple of the average R, G, and B values in the given PIL image
#   bounded by a square of width n with top-left corner at (x,y)
def get_average_color(x, y, n, image):
    r, g, b = 0, 0, 0
    count = 1
    #for s in range(x, x+n+1):
    #    for t in range(y, y+n+1):
    #        pixlr, pixlg, pixlb = image[s, t]
    #        r += pixlr
    #        g += pixlg
    #        b += pixlb
    #        count += 1
    return ((r//count), (g//count), (b//count))

# Looks up the id number associated with a given standardized name
def idLookup(slug, type):
    a = sql_select("id", type, "stdname="+slug)
    return int(a[0].get("id"))

# Looks up the standardized name associated with a given id number
def stdLookup(slug, type):
    a = sql_select("stdname", type, "id=" + str(slug))
    return a[0].get("stdname")


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
    labels = sql_select("name AS label", TABLE_COCKTAILS, ID)
    fields = {"url": "tipsymix.com/api/cocktails/" + str(stdLookup(ID, TABLE_BRANDS)), "id": ID}
    [x.update(fields) for x in labels]
    return labels

# returns the label, id, and url of a desired brand
def brandLinkdataQuery(ID):
    #return sql_select("name AS label", TABLE_BRANDS, ID).update({"url": "tipsymix.com/api/brands/"+str(stdLookup(ID, TABLE_BRANDS)), "id":ID})
    results = sql_select("name AS label", TABLE_BRANDS, ID)
    fields = {"url": "tipsymix.com/api/brands/" + str(stdLookup(ID, TABLE_BRANDS)), "id": ID}
    [x.update(fields) for x in results]
    return results

# returns the label, id, and url of a desired ingredient
def ingredientLinkdataQuery(ID):
    #return sql_select("name AS label", TABLE_INGREDIENTS, ID).update({"url": "tipsymix.com/api/ingredients/"+str(stdLookup(ID, TABLE_BRANDS)), "id":ID})
    results = sql_select("name AS label", TABLE_INGREDIENTS, ID)
    fields = {"url": "tipsymix.com/api/ingredients/" + str(stdLookup(ID, TABLE_BRANDS)), "id": ID}
    [x.update(fields) for x in results]
    return results

# returns the label, id, and url of a desired country
def countryLinkdataQuery(ID):
    results = sql_select("name AS label", TABLE_COUNTRIES, ID)
    fields = {"url": "tipsymix.com/api/countries/" + str(stdLookup(ID, TABLE_BRANDS)), "id": ID}
    [x.update(fields) for x in results]
    return results

################### In Cocktail ###################

# returns a list of brandIDs of brands linked to by a given cocktail
def brandsInCocktailQuery(ID):
    return [match.get("brandID") for match in sql_select("brandID", TABLE_COCKTAIL_BRAND, "cocktailID = "+str(ID))]

# returns a list of ingredientIDs of ingredients linked to by a given cocktail
def ingredientsInCocktailQuery(ID):
    return [match.get("ingredientID") for match in sql_select("ingredientID", TABLE_COCKTAIL_INGREDIENT, "cocktailID = "+str(ID))]

# returns a list of countryIDs of countries linked to by a given cocktail
def countriesInCocktailQuery(ID):
    return [match.get("countryID") for match in sql_select("countryID", TABLE_COCKTAIL_COUNTRY, "cocktailID = "+str(ID))]

################### In Ingredient ###################

# returns a list of brandIDs of brands linked to by a given ingredient
def brandsInIngredientQuery(ID):
    return [match.get("brandID") for match in sql_select("brandID", TABLE_INGREDIENT_BRAND, "ingredientID = "+str(ID))]

# returns a list of ingredientIDs of cocktails linked to by a given ingredient
def cocktailsInIngredientQuery(ID):
    return [match.get("cocktailID") for match in sql_select("cocktailID", TABLE_COCKTAIL_INGREDIENT, "ingredientID = "+str(ID))]

# returns a list of countryIDs of countries linked to by a given ingredient
def countriesInIngredientQuery(ID):
    return [match.get("countryID") for match in sql_select("countryID", TABLE_INGREDIENT_COUNTRY, "ingredientID = "+str(ID))]

################### In Brand ###################

# returns a list of ingredientIDs of ingredients linked to by a given brand
def ingredientsInBrandQuery(ID):
    return [match.get("ingredientID") for match in sql_select("ingredientID", TABLE_INGREDIENT_BRAND, "brandID = "+str(ID))]

# returns a list of cocktailIDs of cocktails linked to by a given brand
def cocktailsInBrandQuery(ID):
    return [match.get("cocktailID") for match in sql_select("cocktailID", TABLE_COCKTAIL_BRAND, "brandID = "+str(ID))]

# returns a list of countryIDs of countries linked to by a given brand
def countriesInBrandQuery(ID):
    return [match.get("countryID") for match in sql_select("countryID", TABLE_BRAND_COUNTRY, "brandID = "+str(ID))]

################### In Country ###################

# returns a list of ingredientIDs of ingredients linked to by a given country
def ingredientsInCountryQuery(ID):
    return [match.get("ingredientID") for match in sql_select("ingredientID", TABLE_INGREDIENT_COUNTRY, "countryID = "+str(ID))]

# returns a list of cocktailIDs of cocktails linked to by a given country
def cocktailsInCountryQuery(ID):
    return [match.get("cocktailID") for match in sql_select("cocktailID", TABLE_COCKTAIL_COUNTRY, "countryID = "+str(ID))]

# returns a list of brandIDs of brands linked to by a given country
def brandsInCountryQuery(ID):
    return [match.get("brandID") for match in sql_select("brandID", TABLE_BRAND_COUNTRY, "countryID = "+str(ID))]

###################### Tags ######################

# returns the list of tags associated with a given cocktail
def tagsInCocktailQuery(ID):
    return [match.get("tagID") for match in sql_select("tagID", TABLE_TAGS_COCKTAIL, "cocktailID = "+str(ID))]

# returns the list of tags associated with a given brand
def tagsInBrandQuery(ID):
    return [match.get("tagID") for match in sql_select("tagID", TABLE_TAGS_BRAND, "brandID = "+str(ID))]

# returns the list of tags associated with a given ingredient
def tagsInIngredientQuery(ID):
    return [match.get("tagID") for match in sql_select("tagID", TABLE_TAGS_INGREDIENT, "ingredientID = "+str(ID))]

# returns the list of tags associated with a given country
def tagsInCountryQuery(ID):
    return [match.get("tagID") for match in sql_select("tagID", TABLE_TAGS_COUNTRY, "countryID = "+str(ID))]

################ Instance Queries #################

# returns the cocktail instance for the given ID
def fetchCocktail(ID):
    return sql_select("*", TABLE_COCKTAILS, "id = "+str(ID))[0]

# returns the ingredient instance for the given ID
def fetchIngredient(ID):
    return sql_select("*", TABLE_INGREDIENTS, "id = "+str(ID))[0]

# returns the brand instance for the given ID
def fetchBrand(ID):
    return sql_select("*", TABLE_BRANDS, "id = "+str(ID))[0]

# returns the country instance for the given ID
def fetchCountry(ID):
    return sql_select("*", TABLE_COUNTRIES, "id = "+str(ID))[0]