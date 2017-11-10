"""
TipsyMix's Flask Backend Interface
- Serves the API and returns the React frontend
"""

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
from urllib import unquote, unquote_plus

from backend import api


################################
# Flask Setup #
################################

app = Flask(__name__, template_folder="frontend/templates",  static_folder="frontend/static")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


################################
# API #
################################

base_api = "/api/"

@app.route(base_api + "search", methods=['GET'])
@cross_origin()
def search():
    category =      request.args.get('category', default=None, type=str)
    query =         request.args.get('query', default=None, type=str)
    filter_rules =  request.args.get(unquote('filterRules'), default=None, type=str)
    count =         request.args.get('count', default=None, type=int)
    page =          request.args.get('page', default=None, type=int)
    pagesize =      request.args.get('pagesize', default=None, type=int)

    response = api.search(category, query, filter_rules, count, page, pagesize)
    return jsonify(response)

@app.route(base_api + "cocktails/<slug>", methods=['GET'])
@cross_origin()
def cocktail_detail(slug):
    return jsonify(api.cocktailDetail(slug))

@app.route(base_api + "ingredients/<slug>", methods=['GET'])
@cross_origin()
def ingredient_detail(slug):
    return jsonify(api.ingredientDetail(slug))

@app.route(base_api + "brands/<slug>", methods=['GET'])
@cross_origin()
def brand_detail(slug):
    return jsonify(api.brandDetail(slug))

@app.route(base_api + "countries/<slug>", methods=['GET'])
@cross_origin()
def country_detail(slug):
    return jsonify(api.countryDetail(slug))

@app.route(base_api + "describe/", methods=['GET'])
@cross_origin()
def descriptions():
    return jsonify(api.describe())



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


