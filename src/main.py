"""

-----------------------------------
TipsyMix's Flask Backend Interface
-----------------------------------

Serves the API and returns the React frontend

GCP Flask Description
- When App Engine receives a web request for your application, it calls the handler script that corresponds to the URL,
as described in the application's app.yaml configuration file. The Python 2.7 runtime supports the WSGI standard.
WSGI is preferred, and some features of Python 2.7 do not work without it. The configuration of your application's
script handlers determines whether a request is handled using WSGI.
- The server determines which Python application object to call by comparing the URL of the request to the URL patterns
in the app's configuration file. It then calls the application object using the arguments as defined in the WSGI
standard. The application object performs actions appropriate to the request, then prepares a response and returns
it as a list of strings.

"""

from flask import Flask, render_template, request
import json

#from backend import api as API

################################
# Flask Setup #
################################

app = Flask(__name__, template_folder="frontend/templates",  static_folder="frontend/static")


################################
# API #
################################

base_api = "/api/"

@app.route(base_api + "search")
def search():
    print("search")
    category =      request.args.get('category', default=None, type=str)
    query =         request.args.get('query', default=None, type=str)
    filterRules =   request.args.get('filterRules', default=None, type=str)
    count =         request.args.get('count', default=None, type=int)
    page =          request.args.get('page', default=None, type=int)
    pagesize =      request.args.get('pagesize', default=None, type=int)
    return json.dumps(API.search(category, query, filterRules, count, page, pagesize))

@app.route(base_api + "cocktails/<slug>")
def cocktail_detail(slug):
    print("cocktail " + slug)
    return json.dumps(API.cocktailDetail(slug))

@app.route(base_api + "ingredients/<slug>")
def ingredient_detail(slug):
    print("ingredient " + slug)
    return json.dumps(API.ingredientDetail(slug))

@app.route(base_api + "brands/<slug>")
def brand_detail(slug):
    print("brand " + slug)
    return json.dumps(API.brandDetail(slug))

@app.route(base_api + "countries/<slug>")
def country_detail(slug):
    print("country " + slug)
    return json.dumps(API.countryDetail(slug))

spoof_cocktails = [{
        "name": "purple drank",
        "brand": "lil yachty drank",
        "year": 2015
    }, {
        "name": "jaegerbomb",
        "brand": "jaeger",
        "year": 2012
    }
]


################################
# React Catch-All #
################################

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react(path):
    return render_template("index.html")


################################
# Running Flask Locally #
################################

if __name__ == '__main__':
    app.run(debug=True)


