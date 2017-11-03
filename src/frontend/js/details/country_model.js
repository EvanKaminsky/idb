import React from 'react';
import { Button } from 'react-bootstrap';

import "../components/Spinner"
import "../../static/css/cocktail.css"
import Spinner from "../components/Spinner";

export default class CountryDetailPage extends React.Component {

    constructor(props) {
        super(props);
        const prevState = this.props.location.state;

        this.state = {
            country: prevState ? prevState.country : null,
            isLoading: false,
            fromCountries: prevState ? prevState.fromCountries : null
        };

        this.reload = this.reload.bind(this);
        this.goBackToCountries = this.goBackToCountries.bind(this);
    }

    reload() {
        if (this.state.isLoading) {
            return;
        }

        const slug = this.props.match.params.slug;  // Passed by react router
        if (slug === null) {
            console.log("No slug for country detail");
            return;
        }

        this.state.isLoading = true;
        window.constants.api.getCountryDetail(slug).then(country => {
            if (country !== null) {
                this.setState({cocktail: country});
            }
            this.state.isLoading = false;
        });
    };

    goBackToCountries(event) {
        event.preventDefault();
        this.props.history.push({pathname:'/countries'});
    };

    render() {
        if (this.state.country === null) {
            this.reload();
            return <Spinner/>
        }

        var backButton = null;
        if (this.state.fromCountries) {
            backButton = <Button onClick={(e)=>this.goBackToCountries(e)}>Back</Button>
        }

        return (
            <div className="col-md-6 cocktail-box">
                <img className="img-responsive" src={this.state.country.imageurl}/>

                <h1>{this.state.country.name}</h1>
                <h4>{this.state.country.continent}</h4>

                <h3>Description</h3>
                <p>{this.state.country.description}</p>

                {backButton}
            </div>
        );
    }

};

