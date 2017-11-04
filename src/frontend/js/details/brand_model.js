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
            brand: prevState ? prevState.brand : null,
            isLoading: false,
            fromBrands: prevState ? prevState.fromBrands : null
        };

        this.reload = this.reload.bind(this);
        this.goBackToBrands = this.goBackToBrands.bind(this);
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

    goBackToBrands(event) {
        event.preventDefault();
        this.props.history.push({pathname:'/brands'});
    };

    render() {
        if (this.state.brand === null) {
            this.reload();
            return <Spinner/>
        }

        var backButton = null;
        if (this.state.fromBrands) {
            backButton = <Button onClick={(e)=>this.goBackToBrands(e)}>Back</Button>
        }

        return (
            <div className="col-md-6 cocktail-box">
                <img className="img-responsive" src={this.state.brand.image}/>

                <h2>{this.state.brand.name}</h2>

                <h3>Details</h3>
                <p>{this.state.brand.details}</p>

                <h3>Countries</h3>
                <p>{this.state.brand.countries}</p>

                <h3>Brands</h3>
                <p>{this.state.brand.ingredients}</p>

                {backButton}
            </div>
        );
    }

};

