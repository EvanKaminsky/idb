//const BASE_API = "https://tipsymix-ttp.appspot.com/api/";
const BASE_API = "http://127.0.0.1:5000/api/";

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

    this.search = function(category, page, pagesize, query, filterRules) {
        var url = "search?";
        var modified = false;

        if (category !== null && category !== undefined) {
            url += "category=" + category;
            modified = true;
        }
         if (query !== null && query !== undefined) {
            url += (modified ? "&query=" : "query=") + encodeURIComponent(query);
        }
        if (page !== null && page !== undefined) {
            url += "&page=" + page;
        }
        if (pagesize !== null && pagesize !== undefined) {
            url += "&pagesize=" + pagesize;
        }
        if (filterRules !== null && filterRules !== undefined) {
            url += "&filterRules=" + encodeURIComponent(filterRules);
        }

        console.log(url);

        return this.get(encodeURI(url)).then(json => {return json});
    };

    this.getIngredients = function(page, pagesize, query, filterRules) {
        return this.search("ingredients", page, pagesize, query, filterRules);
    };

    this.getCountries = function(page, pagesize, query, filterRules) {
        return this.search("countries", page, pagesize, query, filterRules);
    };

    this.getBrands = function(page, pagesize, query, filterRules) {
        return this.search("brands", page, pagesize, query, filterRules);
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