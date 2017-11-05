import React from 'react';
import { Link, browserHistory, IndexRoute } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';

/* Local Imports */
import "../../static/css/about.css"
import backgroundStyle from "../constants.js"
import API from "../api.js"

/* Test Data */
const data = require('json-loader!../../spoof/testdata_brand.json');

const Home = () => <h1>Hola</h1>

const Address = () => <h1>We are located at 555 Jackson St.</h1>

/* Page that displays a grid of brands */
export default class BrandsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            brands: data,
            api: new API()
        }
    }

    componentDidMount() {
        this.reload()
    }

    reload() {
        this.state.api.getBrands(brands => {
            if (brands !== null) {
                this.setState({brands: brands});
            }
        })
    }

    render() {
        return (
            <body style={backgroundStyle}>

            <h1>Tipsy Mix</h1>

            <div id = "searchForm">
                <input type="text" className="search" placeholder="Search by ingredients, cocktail, country, or brand" /><br/>
                <input type="submit" className="searchButton" placeholder="Search" onSubmit={this.reload.bind(this)}/>
            </div>

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
                                          <Route path='/brands/jagermeister' component={Home} />
                                        </div>
                                    </Router>
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