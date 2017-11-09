import React from 'react';
import Link from 'react-router';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import "../../static/css/index.css"
import Spinner from "../components/Spinner.js";
import DetailMultiSection from "./DetailMultiSection.js";
import DetailSingleSection from "./DetailSingleSection.js";

export default class BrandDetailPage extends React.Component {

    constructor(props) {
        super(props);
        const prevState = this.props.location.state;

        this.state = {
            brand: null,
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
        window.constants.api.getBrandDetail(slug).then(brand => {
            if (brand !== null) {
                this.setState({brand: brand});
            }
            this.state.isLoading = false;
        });
    };

    goBack(event) {
        event.preventDefault();
        this.props.history.push({pathname: this.state.fromURL});
    };

    render() {
        if (this.state.brand === null) {
            this.reload();
            return <Spinner/>
        }

        var backButton = null;
        if (this.state.fromURL) {
            backButton = <Button dense color="primary" onClick={(e)=>this.goBack(e)}>Back</Button>
        }

        return (
            <div className="detail-box">
                    <img className="img-responsive" src={this.state.brand.image}/>

                    <Typography type="display3">{this.state.brand.name}</Typography>

                    <DetailSingleSection title="Description" label={this.state.brand.description}/>
                    <DetailSingleSection title="Brand Value" label={this.state.brand.value}/>
                    <DetailSingleSection title="Website" label={this.state.brand.website}/>

                    <DetailMultiSection type="cocktail" elements={this.state.brand.cocktails} history={this.props.history} location={this.props.location}/>
                    <DetailMultiSection type="ingredient" elements={this.state.brand.ingredients} history={this.props.history} location={this.props.location}/>
                    <DetailMultiSection type="country" elements={this.state.brand.countries} history={this.props.history} location={this.props.location}/>

                    {backButton}
            </div>
        );
    }

};

