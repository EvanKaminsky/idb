import React from 'react';

import Page from "./Page.js";

import "../../static/css/about.css"
let backgroundURL = "/static/public/index.jpg";

var data = require('json-loader!../../dummycontent/testdata_ingredient.json');

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
            ingredients: data,
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
                    {this.state.ingredients.map(function(ingredient, i) {
                            return(
                                <div class = "col-md-3 col-md-offset-1 cocktail-box">
                                  <img class="img-responsive" src={"" + ingredient.image} />
                                  <h5>{ingredient.name}</h5>
                                  <p>{ingredient.description}</p>
                                  <a href={"" + ingredient.stdname} class="btn btn-info btn-log" role ="button">More</a>
                                </div>
                            );
                        })}
                  </div>
                </section>
              </body>
        )
    }
}


