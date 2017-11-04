import React from 'react';
import { Button } from 'react-bootstrap';

import "../components/Spinner"
import "../../static/css/cocktail.css"
import Spinner from "../components/Spinner";

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
            console.log("No slug for brand detail");
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
            backButton = <Button onClick={(e)=>this.goBack(e)}>Back</Button>
        }

        return (
            <div className="col-md-6 cocktail-box">
                <img className="img-responsive" src={this.state.brand.image}/>

                <h2>{this.state.brand.name}</h2>

                <h3>Description</h3>
                <p>{this.state.brand.description}</p>

                <h3>Countries</h3>
                <p>{this.state.brand.countries}</p>

                <h3>Ingredients</h3>
                <p>{this.state.brand.ingredients}</p>

                <h3>Cocktails</h3>
                <p>{this.state.brand.cocktails}</p>

                {backButton}
            </div>
        );
    }

};

