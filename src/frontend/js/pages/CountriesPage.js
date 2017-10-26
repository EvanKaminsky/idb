import React from 'react';

/* Local Imports */
import "../../static/css/about.css"
import "../constants.js"

/* Test Data */
const data = require('json-loader!../../spoof/testdata_country.json');

/* Page that displays a grid of countries */
export default class CountriesPage extends React.Component {

    constructor() {
        super();
        this.state = {
            countries: data,
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <body style={backgroundStyle}>

            <h1>Tipsy Mix</h1>

            <div id = "searchForm">
                <input type="text" className="search" placeholder="Search by ingredients, cocktail, country, or brand"/><br />
                <input type="submit" className="searchButton" placeholder="Search" />
            </div>

            <section className = "container">
                <div className = "row">
                    {this.state.countries.map(function(country, i) {
                        return(
                            <div className = "col-md-3 col-md-offset-1 cocktail-box">
                                <img className= "img-responsive" src={"" + country.image} />
                                <h5>{country.name}</h5>
                                <p>{country.description}</p>
                                <a href={"" + country.stdname} className="btn btn-info btn-log" role ="button">More</a>
                            </div>
                        );
                    })}
                </div>
            </section>
            </body>
        )
    }
}