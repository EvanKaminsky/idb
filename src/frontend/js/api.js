const BASE_API = "https://tipsymix-ttp.appspot.com/api/";
//const BASE_API = "http://127.0.0.1:5000/api/";

const ENABLE_CACHING = true;

/* Networking layer for the React frontend */
function API() {

    /* -------------------------------------------------------------- */

    this.restfulRequest = function(method, endpoint, body) {
        var payload = {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };

        if (body !== null && body !== undefined) {
            payload.push({
                key: "body",
                value: JSON.stringify(body)
            });
        }

        return fetch(BASE_API + endpoint, payload)
            .then(response => {
                return response.json();
            })
            .catch((error) => {
                console.error(error);
                return null;
            })
    };

    this.post = function(endpoint, body) {
        return this.restfulRequest("POST", endpoint, body)
    };

    this.get = function(endpoint) {
        if (ENABLE_CACHING && endpoint in window.constants.store) {
            return Promise.resolve(window.constants.store[endpoint]);
        } else {
            return this.restfulRequest("GET", endpoint, null).then(json => {
                window.constants.store[endpoint] = json;
                return json;
            });
        }
    };

    /* -------------------------------------------------------------- */

    this.search = function(category, page, pagesize) {
        var query = "search?";
        if (category) {
            query += "category=" + category;
        }
        if (page) {
            query += "&page=" + page;
        }
        if (pagesize) {
            query += "&pagesize=" + pagesize;
        }
        return this.get(query).then(json => {return json});
    };

    this.getCocktails = function(page, pagesize) {
        return this.search("cocktails", page, pagesize);
    };

    this.getIngredients = function(page, pagesize) {
        return this.search("ingredients", page, pagesize);
    };

    this.getCountries = function(page, pagesize) {
        return this.search("countries", page, pagesize);
    };

    this.getBrands = function(page, pagesize) {
        return this.search("brands", page, pagesize);
    };

    this.getCocktailDetail = function(slug) {
        return this.get("cocktails/" + slug);
    };

    this.getIngredientDetail = function(slug) {
        console.log("ok");
        return this.get("ingredients/" + slug);
    };

    this.getCountryDetail = function(slug) {
        return this.get("countries/" + slug);
    };

    this.getBrandDetail = function(slug) {
        return this.get("brands/" + slug);
    };

    this.getDescriptions = function() {
        return this.get("describe/");
    }

}

export default API