const base_api = "https://tipsymix-ttp.appspot.com/api/";

/* Networking layer for the React frontend */
function API() {

    this.restfulRequest = function(method, endpoint, body, callback) {
        var payload = {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };

        if (body !== null && body !== undefined) {
            payload.push({
                key:   "body",
                value: JSON.stringify(body)
            });
        }

        fetch(base_api + endpoint, payload)
            .then(json => {
                callback(json);
            })
            .catch((error) => {
                console.error(error);
                callback(null);
            })
    };


    this.post = function(endpoint, body, callback) {
        this.restfulRequest("POST", endpoint, body, callback)
    };

    this.get = function(endpoint, callback) {
        this.restfulRequest("GET", endpoint, null, callback)
    };

    /* ----------------------------- */

    this.search = function(callback) {

    };

    this.getCocktails = function(callback) {
        this.get("search?category=cocktails", cocktails =>
            callback(cocktails)
        )
    };

    this.getIngredients = function(callback) {
        this.get("search?category=ingredients", ingredients =>
            callback(ingredients)
        )
    };

    this.getCountries = function(callback) {
        this.get("search?category=countries", countries =>
            callback(countries)
        )
    };

    this.getBrands = function(callback) {
        this.get("search?category=brands", brands =>
            callback(brands)
        )
    };

    this.getCocktailDetail = function(slug, callback) {
        this.get("cocktails/" + slug, cocktail =>
            callback(cocktail)
        )
    };

    this.getIngredientDetail = function(slug, callback) {
        this.get("ingredients/" + slug, ingredient =>
            callback(ingredient)
        )
    };

    this.getCountryDetail = function(slug, callback) {
        this.get("countries/" + slug, country =>
            callback(country)
        )
    };

    this.getBrandDetail = function(slug, callback) {
        this.get("brands/" + slug, brand  =>
            callback(brand)
        )
    };

}

export default API

