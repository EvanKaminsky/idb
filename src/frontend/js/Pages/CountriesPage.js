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

export default class CountriesPage extends React.Component {
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
                    <div class = "col-md-3 cocktail-box">
                      <img class= "img-responsive" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/840px-Flag_of_Mexico.svg.png" />
                      <h5>Mexico</h5>
                      <a href="countries/mexico.html" class="btn btn-info btn-log" role ="button">More</a>
                    </div>

                    <div class = "col-md-3 col-md-offset-1 cocktail-box">
                      <img class="img-responsive" src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/900px-Flag_of_Russia.svg.png" />
                      <h5>Russia</h5>
                      <a href="countries/russia.html" class="btn btn-info btn-log" role ="button">More</a>
                    </div>

                    <div class = "col-md-3 col-md-offset-1 cocktail-box">
                      <img class="img-responsive" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/1200px-Flag_of_Ireland.svg.png"/>
                      <h5>Ireland</h5>
                      <a href="countries/ireland.html" class="btn btn-info btn-log" role ="button">More</a>
                    </div>

                  </div>
                </section>
              </body>
        )
    }
}