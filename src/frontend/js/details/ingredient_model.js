import React from 'react';
import { Button } from 'react-bootstrap';

import "../components/Spinner"
import "../../static/css/cocktail.css"
import Spinner from "../components/Spinner";

export default class IngredientDetailPage extends React.Component {

    constructor(props) {
        super(props);
        const prevState = this.props.location.state;

        this.state = {
            ingredient: null,
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
            console.log("No slug for ingredient detail");
            return;
        }

        this.state.isLoading = true;
        window.constants.api.getIngredientDetail(slug).then(ingredient => {
            if (ingredient !== null) {
                this.setState({ingredient: ingredient});
            }
            this.state.isLoading = false;
        });
    };

    goBack(event) {
        event.preventDefault();
        this.props.history.push({pathname: this.state.fromURL});
    };

    render() {
        if (this.state.ingredient === null) {
            this.reload();
            return <Spinner/>
        }

        var backButton = null;
        if (this.state.fromURL) {
            backButton = <Button onClick={(e)=>this.goBack(e)}>Back</Button>
        }

        return (
            <div className="col-md-6 cocktail-box">
                <img className="img-responsive" src={this.state.ingredient.image}/>

                <h2>{this.state.ingredient.name}</h2>

                <h3>Description</h3>
                <ul>{this.state.ingredient.description}</ul>

                <h3>Countries</h3>
                <p>{this.state.ingredient.countries}</p>

                <h3>Cocktails</h3>
                <p>{this.state.ingredient.cocktails}</p>

                <h3>Brands</h3>
                <p>{this.state.ingredient.brands}</p>

                {backButton}
            </div>
        );
    }

};

