import React from 'react';

import Page from "./Page.js";

import "../../static/css/about.css"
let backgroundURL = "/static/public/index.jpg";

var data = require('json-loader!../../dummycontent/testdata_cocktail.json');

const background = {
    backgroundImage: 'url(' + backgroundURL + ')',
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
};

const url = "https://tipsymix-ttp.appspot.com/api/cocktails/api/search"

function reqListener(e) {
        data = JSON.parse(this.responseText);
    }


export default class CocktailsPage extends React.Component {

    constructor() {
        console.log(data);
        super();
        this.state = {
            cocktails: data,
        }
    }

    componentDidMount() {
        fetch(url).then(response => {
            return response.json()
        }).then(data => {
            this.setState({cocktails: data.result});
            console.log("state", this.state.cocktails);
        }).catch((error) => {
            console.error(error);
        })
    }

    render() {
        console.log(this.state);
        console.log("number 1", this.state.cocktails[0].name);
        return (
            <body style = {background}>
                <h1>Tipsy Mix</h1>

                <div id = "searchForm">
                  <input type="text" class="search" placeholder="Search by ingredients, cocktail, country, or brand" /><br/>
                  <input type="submit" class="searchButton" placeholder="Search" onSubmit={this.handleSubmit}/>
                </div>

                <section class = "container">
                    <div class = "row">
                        {this.state.cocktails.map(function(cocktail, i) {
                            return(
                                <div class = "col-md-3 col-md-offset-1 cocktail-box">
                                  <img class= "img-responsive" src={"" + cocktail.image} />
                                  <h5>{cocktail.name}</h5>
                                  <p>{cocktail.description}</p>
                                  <a href={"" + cocktail.stdname} class="btn btn-info btn-log" role ="button">More</a>
                                </div>
                            );
                        })}
                    </div>
                </section>
              </body>
        )
    }
}


