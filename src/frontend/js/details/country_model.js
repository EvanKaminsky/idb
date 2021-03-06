import React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import "../../static/css/index.css"
import Spinner from "../components/Spinner.js";
import DetailMultiSection from "./DetailMultiSection.js";
import DetailSingleSection from "./DetailSingleSection.js";

export default class CountryDetailPage extends React.Component {

    constructor(props) {
        super(props);
        const prevState = this.props.location.state;

        this.state = {
            country: null,
            isLoading: false,
            fromURL: prevState ? prevState.fromURL : null
        };

        this.reload = this.reload.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    reload() {
        if (this.state.isLoading) {
            return;
        }

        const slug = this.props.match.params.slug;  // Passed by react router
        if (slug === null) {
            return;
        }

        this.state.isLoading = true;
        window.constants.api.getCountryDetail(slug).then(country => {
            if (country !== null) {
                this.setState({country: country});
            }
            this.state.isLoading = false;
        });
    };

    goBack(event) {
        event.preventDefault();
        this.props.history.push({pathname: this.state.fromURL});
    };

    render() {
        if (this.state.country === null) {
            this.reload();
            return <Spinner/>
        }

        var backButton = null;
        if (this.state.fromURL) {
            backButton = <Button dense color="primary" onClick={(e)=>this.goBack(e)}>Back</Button>
        }

        return (
            <div className="detail-box">
                <img className="img-responsive" src={this.state.country.image}/>

                <Typography type="display3">{this.state.country.name}</Typography>

                <DetailSingleSection title="Description" label={this.state.country.description}/>
                <DetailSingleSection title="Capital" label={this.state.country.capital}/>
                <DetailSingleSection title="Continent" label={this.state.country.continent}/>

                <DetailMultiSection type="cocktail" elements={this.state.country.cocktails} history={this.props.history} location={this.props.location}/>
                <DetailMultiSection type="brand" elements={this.state.country.brands} history={this.props.history} location={this.props.location}/>
                <DetailMultiSection type="ingredient" elements={this.state.country.ingredients} history={this.props.history} location={this.props.location}/>

                {backButton}
            </div>
        );
    }

};

