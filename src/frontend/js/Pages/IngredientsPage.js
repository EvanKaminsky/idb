import React from 'react';

import Page from "./Page.js";

import "../../static/css/about.css"
let backgroundURL = "/static/public/index.jpg";

const background = {
    backgroundImage: 'url(' + backgroundURL + ')',
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
};

const url = "https://tipsymix-ttp.appspot.com/api/cocktails/api/search"

export default class IngredientsPage extends React.Component {
    constructor() {
        super();
        this.state = {
            ingredients: [],
        }
    }

    componentDidMount() {
        fetch(url).then(response => {
            return response.json()
        }).then(data => {
            this.setState({ingredients: data.result});
            console.log("state", this.state.ingredients);
        }).catch((error) => {
            console.error(error);
        })
    }

    render() {
        return (
            <body style = {background}>
                <h1>Tipsy Mix</h1>

                <div id = "searchForm">
                  <input type="text" class="search" placeholder="Search by ingredients, cocktail, country, or brand" /><br />
                  <input type="submit" class="searchButton" placeholder="Search" />
                </div>

                <section class = "container">
                  <div class = "row">
                    <div class = "col-md-3 cocktail-box center-block">
                      <img class= "img-responsive" src="https://drizly-products2.imgix.net/ci_4683.png?auto=format%2Ccompress&fm=jpg&q=20" />
                      <h5>Vodka</h5>
                      <p>A clear alcoholic spirit originating in Russia, made from grain.</p>
                      <a href="ingredients/vodka.html" class="btn btn-info btn-log" role ="button">More</a>
                    </div>

                    <div class = "col-md-3 col-md-offset-1 cocktail-box">
                      <img class="img-responsive" src="https://drizly-products1.imgix.net/ci_3797.jpg?auto=format%2Ccompress&fm=jpg&q=20" />
                      <h5>Tequila</h5>
                      <p>A spirit that is only produced in two regions of Mexico and that is made from a minimum of 51% distilled blue agave sap.</p>
                      <a href="ingredients/tequila.html" class="btn btn-info btn-log" role ="button">More</a>
                    </div>

                    <div class = "col-md-3 col-md-offset-1 cocktail-box">
                      <img class="img-responsive" src="https://cdn2.bigcommerce.com/server5500/tpbc2s65/products/2999/images/3093/kahlua375new__60056.1363380770.380.500.jpg?c=2"/>
                      <h5>Kahlua</h5>
                      <p>A coffee liqueur produced in Mexico that is 26% alcohol by volume.</p>
                      <a href="ingredients/kahlua.html" class="btn btn-info btn-log" role ="button">More</a>
                    </div>
                  </div>
                </section>
              </body>
        )
    }
}


