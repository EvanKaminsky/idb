import React from 'react';
import { Button } from 'react-bootstrap';

import "../components/Spinner"
import "../../static/css/cocktail.css"
import Spinner from "../components/Spinner";

export default class CocktailDetailPage extends React.Component {

    constructor(props) {
        super(props);
        const prevState = this.props.location.state;

        this.state = {
            cocktail: null,
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
            console.log("No slug for cocktail detail");
            return;
        }

        this.state.isLoading = true;
        window.constants.api.getCocktailDetail(slug).then(cocktail => {
            if (cocktail !== null) {
                this.setState({cocktail: cocktail});
            }
            this.state.isLoading = false;
        });
    };

    goBack(event) {
        event.preventDefault();
        this.props.history.push({pathname: this.state.fromURL});
    };

    render() {
        if (this.state.cocktail === null) {
            this.reload();
            return <Spinner/>
        }

        var backButton = null;
        if (this.state.fromURL) {
            backButton = <Button onClick={(e)=>this.goBack(e)}>Back</Button>
        }

        return (
            <div className="col-md-6 cocktail-box">
                <img className="img-responsive" src={this.state.cocktail.image}/>

                <h1>{this.state.cocktail.name}</h1>

                <h3>Ingredients</h3>
                <ul>{this.state.cocktail.ingredients}</ul>

                <h3>Recipe & Description</h3>
                <p>{this.state.cocktail.description}</p>

                <h3>Brands</h3>
                <p>{this.state.cocktail.brands}</p>

                <h3>Countries</h3>
                <p>{this.state.cocktail.countries}</p>

                {backButton}
            </div>
        );
    }

};

