import React from 'react';

/* Local Imports */
import "../../static/css/about.css"
let backgroundURL = "/static/public/index.jpg";

/* Test Data */
const data = require('json-loader!../../dummycontent/testdata_ingredient.json');

/* Image Style */
const background = {
    backgroundImage: 'url(' + backgroundURL + ')',
    flex: 1,
    resizeMode: 'cover'
};

/* Page with a grid of ingredients */
export default class IngredientsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            ingredients: data,
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <body style = {background}>

            <h1>Tipsy Mix</h1>

            <div id = "searchForm">
                <input type="text" className="search" placeholder="Search by ingredients, cocktail, country, or brand" /><br />
                <input type="submit" className="searchButton" placeholder="Search" />
            </div>

            <section className = "container">
                <div className = "row">
                    { this.state.ingredients.map(function(ingredient, i) {
                        return (
                            <div className = "col-md-3 col-md-offset-1 cocktail-box">
                                <img className ="img-responsive" src={"" + ingredient.image} />]
                                <h5>{ingredient.name}</h5>
                                <p>{ingredient.description}</p>
                                <a href={"" + ingredient.stdname} className="btn btn-info btn-log" role ="button">More</a>
                            </div>
                        );
                    })}
                </div>
            </section>
            </body>
        )
    }
}


