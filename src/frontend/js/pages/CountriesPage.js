import React from 'react';
import {Button} from 'react-bootstrap';

/* Local Imports */
import "../../static/css/about.css"
import backgroundStyle from "../constants.js"
import TipsySearchbar from "../components/TipsySearchbar";
import Spinner from "../components/Spinner";

/* Page that displays a grid of countries */
export default class CountriesPage extends React.Component {

    constructor() {
        super();
        this.state = {
            countries: [],
            isLoading: false
        };

        this.openCountryDetail = this.openCountryDetail.bind(this);
        this.reload = this.reload.bind(this);
    }

    reload() {
        if (this.state.isLoading) {
            return;
        }

        this.state.isLoading = true;
        window.constants.api.getCountries().then(countries => {
            if (countries !== null) {
                this.setState({countries: countries});
            }
            this.state.isLoading = false;
        })
    }

    openCountryDetail(country, event) {
        event.preventDefault();
        this.props.history.push({
            pathname:'/country-detail/' + country.id,
            state: {"fromURL": "/countries"}
        });
    };

    render() {

        // Activity indicator when cocktails have not loaded
        var spinner = null;
        if (this.state.countries.length < 1) {
            this.reload();
            spinner = <Spinner/>
        }

        return (
            <div style={backgroundStyle}>

                <h1>Tipsy Mix</h1>

                <TipsySearchbar/>

                <section className = "container">
                    <div className = "row">
                        {spinner}

                        {this.state.countries.map(function(country, i) { return (
                            <div key={i} className = "col-md-3 col-md-offset-1 cocktail-box">
                                <img className= "img-responsive" src={"" + country.image} />
                                <h5>{country.name}</h5>
                                <p>{country.description}</p>

                                <Button bsStyle="info" onClick={(e)=>this.openCountryDetail(country, e)}>More</Button>
                            </div>
                        );}, this)}
                    </div>
                </section>
            </div>
        )
    }
}
