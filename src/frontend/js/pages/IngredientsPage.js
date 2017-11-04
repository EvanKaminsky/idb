import React from 'react';
import {Button} from 'react-bootstrap';

/* Local Imports */
import "../../static/css/about.css"
import backgroundStyle from "../constants.js"
import TipsySearchbar from "../components/TipsySearchbar";
import Spinner from "../components/Spinner";

/* Page with a grid of ingredients */
export default class IngredientsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            ingredients: [],
            isLoading: false
        };

        this.openIngredientDetail = this.openIngredientDetail.bind(this);
        this.reload = this.reload.bind(this);
    }

    reload() {
        if (this.state.isLoading) {
            return;
        }

        this.state.isLoading = true;
        window.constants.api.getIngredients().then(ingredients => {
            if (ingredients !== null) {
                this.setState({ingredients: ingredients});
            }
            this.state.isLoading = false;
        })
    }

    openIngredientDetail(ingredient, event) {
        event.preventDefault();
        this.props.history.push({pathname:'/ingredient-detail/' + ingredient.id, state: {"ingredient": ingredient, "fromIngredients": true}});
    };

    render() {

        // Activity indicator when cocktails have not loaded
        var spinner = null;
        if (this.state.ingredients.length < 1) {
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

                        {this.state.ingredients.map(function(ingredient, i) { return (
                            <div key={i} className = "col-md-3 col-md-offset-1 cocktail-box">
                                <img className ="img-responsive" src={"" + ingredient.image} />
                                <h5>{ingredient.name}</h5>
                                <p>{ingredient.description}</p>

                                <Button bsStyle="info" onClick={(e)=>this.openIngredientDetail(ingredient, e)}>More</Button>
                            </div>
                        );}, this)}
                    </div>
                </section>
            </div>
        )
    }
}
