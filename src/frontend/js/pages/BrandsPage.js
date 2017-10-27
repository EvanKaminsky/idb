import React from 'react';

/* Local Imports */
import "../../static/css/about.css"
import backgroundStyle from "../constants.js"

/* Test Data */
const data = require('json-loader!../../spoof/testdata_brand.json');

/* Page that displays a grid of brands */
export default class BrandsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            brands: data,
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <body style={backgroundStyle}>

            <h1>Tipsy Mix</h1>

            <div id = "searchForm">
                <input type="text" className="search" placeholder="Search by ingredients, cocktail, country, or brand" /><br/>
                <input type="submit" className="searchButton" placeholder="Search" />
            </div>

            <section className = "container">
                <div className = "row">
                    {this.state.brands.map(function(brand, i) {
                        return(
                            <div className = "col-md-3 col-md-offset-1 cocktail-box">
                                <img className= "img-responsive" src={"" + brand.image} />
                                <h5>{brand.name}</h5>
                                <p>{brand.description}</p>
                                <a href={"" + brand.stdname} className="btn btn-info btn-log" role ="button">More</a>
                            </div>
                        );
                    })}
                </div>
            </section>
            </body>
        )
    }
}