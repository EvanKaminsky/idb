const base_api = "https://tipsymix-ttp.appspot.com/api/";
//const base_api = "http://127.0.0.1:5000/api/";

/* Networking layer for the React frontend */
function API() {

    /* -------------------------------------------------------------- */

    this.restfulRequest = function(method, endpoint, body ) {
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

        console.log(base_api);

        return fetch(base_api + endpoint, payload)
            .then(response => response.json())
            .catch((error) => {
                console.error(error);
                return null;
            })
    };

    this.post = function(endpoint, body) {
        return this.restfulRequest("POST", endpoint, body)
    };

    this.get = function(endpoint) {
        return this.restfulRequest("GET", endpoint, null)
    };

    /* -------------------------------------------------------------- */

    this.search = function(callback) {

    };

    this.getCocktails = function() {
        return this.get("search?category=cocktails").then(cocktails =>
            (cocktails === null) ? null : cocktails.results
        )
    };

    this.getIngredients = function(callback) {
        return this.get("search?category=ingredients").then(ingredients =>
            (ingredients === null) ? null : ingredients.results
        )
    };

    this.getCountries = function(callback) {
        return this.get("search?category=countries").then(countries =>
            (countries === null) ? null : countries.results
        )
    };

    this.getBrands = function(callback) {
        return this.get("search?category=brands").then(brands =>
            (brands === null) ? null : brands.results
        )
    };

    this.getCocktailDetail = function(slug, callback) {
        return this.get("cocktails/" + slug).then(cocktail =>
            (cocktail === null) ? null : cocktail
        )
    };

    this.getIngredientDetail = function(slug, callback) {
        return this.get("ingredients/" + slug).then(ingredient =>
            (ingredient === null) ? null : ingredient
        )
    };

    this.getCountryDetail = function(slug, callback) {
        return this.get("countries/" + slug).then(country =>
            (country === null) ? null : country
        )
    };

    this.getBrandDetail = function(slug, callback) {
        return this.get("brands/" + slug).then(brand =>
            (brand === null) ? null : brand
        )
    };

}

export default API

