const base_api = "https://boiling-fortress-21285.herokuapp.com/api/";

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


    };

    this.getIngredients = function(callback) {


    };

    this.getCoutnries = function(callback) {


    };

    this.getBrands = function(callback) {


    };

    this.getCocktailDetail = function(slug, callback) {


    };

    this.getIngredientDetail = function(slug, callback) {


    };

    this.getCountryDetail = function(slug, callback) {


    };

    this.getBrandDetail = function(slug, callback) {


    };




    this.login = function(callback) {
        this.get("login", json =>
            callback(json.result)
        )
    };

    this.register = function(username, callback) {
        this.post("adduser", {"name": username}, json =>
            callback(json)
        )
    }

}

export default API

