import React from 'react';
import Grid from 'material-ui/Grid';

import TipsySearchbar from "../components/TipsySearchbar";
import Spinner from "../components/Spinner";
import TipsyGrid from "../components/TipsyGrid.js";
import CountryCard from "../cards/CountryCard.js";

/* Page that displays a grid of countries */
export default class CountriesPage extends React.Component {

    constructor() {
        super();
        this.state = {
            countries: [],
            descriptions: [],
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
        });

        window.constants.api.getDescriptions().then(descriptions => {
            if (descriptions !== null) {
                this.setState({descriptions: descriptions});
            }
        });
    }

    openCountryDetail(country, event) {
        event.preventDefault();
        this.props.history.push({
            pathname:'/country-detail/' + country.id,
            state: {"fromURL": "/countries"}
        });
    };

    render() {
        var spinner = null;
        if (this.state.countries.length < 1) {
            this.reload();
            spinner = <Spinner/>
        }

        return (
            <div>
                <h1>Tipsy Mix</h1>

                <TipsySearchbar/>

                <section className = "container">
                    <div className = "row">
                        {spinner}

                        <TipsyGrid elements={spinner !== null ? spinner :
                            this.state.countries.map(function(country, i) { return (
                            <Grid key={i} item>
                                <CountryCard country={country} onClick={(e)=>this.openCountryDetail(country, e)}/>
                            </Grid>
                        )}, this)}/>
                    </div>
                </section>
            </div>
        )
    }
}
