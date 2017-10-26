import React from 'react';

import Page from "./Page.js";

import "../../static/css/about.css"
import "../Constants";
import Constants from "../Constants";

let backgroundURL = "/static/public/index.jpg";
const background = {
    backgroundImage: 'url(' + backgroundURL + ')',
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
};

export default class CocktailsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            cocktails: [],
        }
    }

    componentDidMount() {

        fetch(Constants.search_base + " url).then(response => {
            return response.json()
        }).then(data => {
            this.setState({cocktails: data.result});
            console.log("state", this.state.cocktails);
        }).catch((error) => {
            console.error(error);
        })
    }

    render() {
        console.log("Rendering")

        return (
            <body style = {background}>
                <h1>Tipsy Mix</h1>

                <div id = "searchForm">
                  <input type="text" className="search" placeholder="Search by ingredients, cocktail, country, or brand" /><br/>
                  <input type="submit" className="searchButton" placeholder="Search" />
                </div>

                <section className = "container">
                  <div className = "row">
                    <div className = "col-md-3 cocktail-box">
                      <img className= "img-responsive" src="http://www.1001cocktails.com/images/like-hand-grenade-5504.jpg" />
                      <h5>Like Hand Grenade</h5>
                      <p>gin, grain alcohol, melon liquer, rum, vodka</p>
                      <a href="cocktails/likeHandGrenade.html" className="btn btn-info btn-log" role ="button">More</a>
                    </div>

                    <div className = "col-md-3 col-md-offset-1 cocktail-box">
                      <img className ="img-responsive" src="http://www.1001cocktails.com/images/flaming-lamborghini-5541.jpg" />
                      <h5>Flaming Lamborghini</h5>
                      <p>coffe liqueuer (tia maria, kahlua), sambuca, blue curacao liqueur, irish cream (bailey's)</p>
                      <a href="cocktails/flamingLamborghini.html" className="btn btn-info" role ="button">More</a>
                    </div>

                    <div className = "col-md-3 col-md-offset-1 cocktail-box">
                      <img className ="img-responsive" src="http://www.1001cocktails.com/images/blue-lagoon-50.jpg"/>
                      <h5>Blue Lagoon</h5>
                      <p>vodka, blue curacao liquer, lemonade, cherry</p>
                      <a href="cocktails/blueLagoon.html" classNAme="btn btn-info" role ="button">More</a>
                    </div>

                  </div>
                </section>
              </body>
        )
    }
}


