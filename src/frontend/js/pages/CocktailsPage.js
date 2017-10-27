import React from 'react';

/* Local Imports */
import "../../static/css/about.css"

/* Test Data */
const data = require('json-loader!../../spoof/testdata_cocktail.json');

let backgroundURL = "/static/public/index.jpg";

const background = {
    backgroundImage: 'url(' + backgroundURL + ')',
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
};

/* Page that displays a grid of cocktails */
export default class CocktailsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            cocktails: data,
        }
    }

    componentDidMount() {

    }

    search() {


    }

    render() {
        return (
            <body style = {background}>

            <h1>Tipsy Mix</h1>

            <div id = "searchForm">
                <input type="text" className="search" placeholder="Search by ingredients, cocktail, country, or brand" /><br/>
                <input type="submit" className="searchButton" placeholder="Search" onSubmit={this.search.bind(this)}/>
            </div>

            <section className = "container">
                <div className = "row">
                    {this.state.cocktails.map(function(cocktail, i) {
                        return(
                            <div className = "col-md-3 col-md-offset-1 cocktail-box">
                                <img className = "img-responsive" src={"" + cocktail.image} />
                                <h5>{cocktail.name}</h5>
                                <p>{cocktail.description}</p>
                                <a href={"" + cocktail.stdname} className="btn btn-info btn-log" role ="button">More</a>
                            </div>
                        );
                    })}
                </div>
            </section>
            </body>
        )
    }
}


