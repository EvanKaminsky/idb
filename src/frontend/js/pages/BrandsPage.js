import React from 'react';
import { Link, browserHistory, IndexRoute } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';

/* Local Imports */
import "../../static/css/about.css"
import backgroundStyle from "../constants.js"
import TipsySearchbar from "../components/TipsySearchbar";
import Spinner from "../components/Spinner";

const Home = () => <h1>Hola</h1>

const Address = () => <h1>We are located at 555 Jackson St.</h1>

/* Page that displays a grid of brands */
export default class BrandsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            brands: [],
            isLoading: false
        };

        this.openBrandDetail = this.openBrandDetail.bind(this);
        this.reload = this.reload.bind(this);
    }

    reload() {
        if (this.state.isLoading) {
            return;
        }

        this.state.isLoading = true;
        window.constants.api.getBrands().then(brands => {
            if (brands !== null) {
                this.setState({brands: brands});
            }
            this.state.isLoading = false;
        })
    }

    openBrandDetail(brand, event) {
        event.preventDefault();
        this.props.history.push({
            pathname:'/brand-detail/' + brand.id,
            state: {"fromURL": "/brands"}
        });
    };

    render() {

        // Activity indicator when cocktails have not loaded
        var spinner = null;
        if (this.state.brands.length < 1) {
            this.reload();
            spinner = <Spinner/>
        }

        return (
            <div style={backgroundStyle}>

                <h1>Tipsy Mix</h1>

                <TipsySearchbar/>

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
            </div>
            </body>
        )
    }
}
