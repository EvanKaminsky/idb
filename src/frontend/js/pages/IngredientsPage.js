import React from 'react';

/* Local Imports */
import API from "../api.js"
import "../../static/css/about.css"
import backgroundStyle from "../constants.js"
import TipsySearchbar from "../components/TipsySearchbar";

/* Page with a grid of ingredients */
export default class IngredientsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            ingredients: [],
            api: new API()
        }
    }

    componentDidMount() {
        this.reload()
    }

    reload() {
        this.state.api.getIngredients(ingredients => {
            if (ingredients !== null) {
                this.setState({ingredients: ingredients});
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
                    { this.state.ingredients.map(function(ingredient, i) {
                        return (
                            <div key={i} className = "col-md-3 col-md-offset-1 cocktail-box">
                                <img className ="img-responsive" src={"" + ingredient.image} />
                                <h5>{ingredient.name}</h5>
                                <p>{ingredient.description}</p>
                                <a href={"" + ingredient.stdname} className="btn btn-info btn-log" role ="button">More</a>
                            </div>
                        );
                    })}
                </div>
            </section>
            </div>
        )
    }
}


