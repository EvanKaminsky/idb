const base_api = "https://tipsymix-ttp.appspot.com/api/";
//const base_api = "http://127.0.0.1:5000/api/";

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
        return this.get(query).then(json =>
            (json === null) ? null : json.results
        )
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