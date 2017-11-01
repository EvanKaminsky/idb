import React from 'react';

/* Local Imports */
import API from "../api.js"
import "../../static/css/about.css"
import backgroundStyle from "../constants.js"
import TipsySearchbar from "../components/TipsySearchbar";

/* Page that displays a grid of countries */
export default class CountriesPage extends React.Component {

    constructor() {
        super();
        this.state = {
            countries: [],
            api: new API()
        }
    }

    componentDidMount() {
        this.reload()
    }

    reload() {
        this.state.api.getCountries(countries => {
            if (countries !== null) {
                this.setState({countries: countries});
            }
        })
    }

    render() {
        return (
            <div style={backgroundStyle}>

            <h1>Tipsy Mix</h1>

            <TipsySearchbar/>

            <section className = "container">
                <div className = "row">
                    {this.state.countries.map(function(country, i) {
                        return(
                            <div key={i} className = "col-md-3 col-md-offset-1 cocktail-box">
                                <img className= "img-responsive" src={"" + country.image} />
                                <h5>{country.name}</h5>
                                <p>{country.description}</p>
                                <a href={"" + country.stdname} className="btn btn-info btn-log" role ="button">More</a>
                            </div>
                        );
                    })}
                </div>
            </section>
            </div>
        )
    }
}