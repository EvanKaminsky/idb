import React from 'react';

import Page from "./Page.js";

import "../../static/css/about.css"
let backgroundURL = "/static/public/index.jpg";

var data = require('json-loader!../../dummycontent/testdata_country.json');

const background = {
    backgroundImage: 'url(' + backgroundURL + ')',
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
};

const url = "https://tipsymix-ttp.appspot.com/api/cocktails/api/search"

export default class CountriesPage extends React.Component {

    constructor() {
        console.log(data);
        super();
        this.state = {
            countries: data,
        }
    }

    componentDidMount() {
        fetch(url).then(response => {
            return response.json()
        }).then(data => {
            this.setState({countries: data.result});
            console.log("state", this.state.countries);
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

                    {this.state.countries.map(function(country, i) {
                            return(
                                <div class = "col-md-3 col-md-offset-1 cocktail-box">
                                  <img class= "img-responsive" src={"" + country.image} />
                                  <h5>{country.name}</h5>
                                  <p>{country.description}</p>
                                  <a href={"" + country.stdname} class="btn btn-info btn-log" role ="button">More</a>
                                </div>
                            );
                        })}

                  </div>
                </section>
              </body>
        )
    }
}