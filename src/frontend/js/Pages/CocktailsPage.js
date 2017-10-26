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

export default class CocktailsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            cocktails: [],
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
                      <img class= "img-responsive" src="http://www.1001cocktails.com/images/like-hand-grenade-5504.jpg" />
                      <h5>Like Hand Grenade</h5>
                      <p>gin, grain alcohol, melon liquer, rum, vodka</p>
                      <a href="cocktails/likeHandGrenade.html" class="btn btn-info btn-log" role ="button">More</a>
                    </div>

                    <div class = "col-md-3 col-md-offset-1 cocktail-box">
                      <img class="img-responsive" src="http://www.1001cocktails.com/images/flaming-lamborghini-5541.jpg" />
                      <h5>Flaming Lamborghini</h5>
                      <p>coffe liqueuer (tia maria, kahlua), sambuca, blue curacao liqueur, irish cream (bailey's)</p>
                      <a href="cocktails/flamingLamborghini.html" class="btn btn-info" role ="button">More</a>
                    </div>

                    <div class = "col-md-3 col-md-offset-1 cocktail-box">
                      <img class="img-responsive" src="http://www.1001cocktails.com/images/blue-lagoon-50.jpg"/>
                      <h5>Blue Lagoon</h5>
                      <p>vodka, blue curacao liquer, lemonade, cherry</p>
                      <a href="cocktails/blueLagoon.html" class="btn btn-info" role ="button">More</a>
                    </div>

                  </div>
                </section>
              </body>
        )
    }
}


