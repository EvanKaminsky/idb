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

export default class BrandsPage extends React.Component {
    render() {
        return (
            <body style = {background}>
                <h1>Tipsy Mix</h1>

                <div id = "searchForm">
                  <input type="text" class="search" placeholder="Search by ingredients, cocktail, country, or brand" /><br/>
                  <input type="submit" class="searchButton" placeholder="Search" />
                </div>


                <section class = "container">
                  <div class = "row">
                    <div class = "col-md-3 cocktail-box">
                      <img class= "img-responsive" src="http://thecocktailgeek.com/wp-content/uploads/2014/07/Blackwoods-Logo.png" />
                      <h5>Blackwoods</h5>
                      <p>Vodka, Gin</p>
                    <a href="brands/blackwoods.html" class="btn btn-info btn-log" role ="button">More</a>
                    </div>

                    <div class = "col-md-3 col-md-offset-1 cocktail-box">
                      <img class="img-responsive" src="https://wine-searcher1.freetls.fastly.net/images/labels/66/10/olmeca-gold-tequila-mexico-10426610.jpg" />
                      <h5>Olmeca</h5>
                      <p>Tequila</p>
                      <a href="brands/olmeca.html" class="btn btn-info btn-log" role ="button">More</a>
                    </div>

                    <div class = "col-md-3 col-md-offset-1 cocktail-box">
                      <img class="img-responsive" src="https://cdn.shopify.com/s/files/1/1780/9427/products/martell-cognac-xo-2_530x.png?v=1505577633"/>
                      <h5>Martell</h5>
                      <p>Cognac</p>
                      <a href="brands/martell.html" class="btn btn-info btn-log" role ="button">More</a>
                    </div>

                  </div>
                </section>
              </body>
        )
    }
}