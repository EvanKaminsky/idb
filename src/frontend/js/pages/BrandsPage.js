import React from 'react';
import { Link, browserHistory, IndexRoute } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';

/* Local Imports */
import "../../static/css/about.css"
import backgroundStyle from "../constants.js"

/* Test Data */
const data = require('json-loader!../../spoof/testdata_brand.json');

const Button = () => <a href={"" + data[0].stdname} className="btn btn-info btn-log" role ="button">More</a>

const Data = () => <div class = "col-md-6 cocktail-box">
                      <img class="img-responsive" src={"" + data[0].image} />
                      <h2>{data[0].name}</h2>
                      <h3>Details</h3>
                      <p>{data[0].details}</p>
                      <h3>Countries</h3>
                      <p>{data[0].countries}</p>
                      <h3>Ingredients</h3>
                      <p>{data[0].ingredients}</p>
                    </div>

const Address = () => <h1>We are located at 555 Jackson St.</h1>

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

            <Router>
                <Switch>
                    <Route path = '/' component={Data} />
                </Switch>
            </Router>

            <section className = "container">
                <div className = "row">

                        {this.state.brands.map(function(brand, i) {
                            return(
                                <div className = "col-md-3 col-md-offset-1 cocktail-box">
                                    <img className= "img-responsive" src={"" + brand.image} />
                                    <h5>{brand.name}</h5>
                                    <p>{brand.description}</p>

                                    <Router>
                                        <div>
                                          <Route path='/' component={Button} />
                                        </div>
                                    </Router>
                                </div>
                            );
                        })}
                </div>
            </section>
            </body>
        )
    }
}