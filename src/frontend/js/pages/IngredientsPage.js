import React from 'react';
import Grid from 'material-ui/Grid';

import TipsySearchbar from "../components/TipsySearchbar";
import Spinner from "../components/Spinner";
import TipsyGrid from "../components/TipsyGrid.js";
import IngredientCard from "../cards/IngredientCard";

/* Page with a grid of ingredients */
export default class IngredientsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            ingredients: [],
            descriptions: [],
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
        });

         window.constants.api.getDescriptions().then(descriptions => {
            if (descriptions !== null) {
                this.setState({descriptions: descriptions});
            }
        });
    }

    openIngredientDetail(ingredient, event) {
        event.preventDefault();
        this.props.history.push({
            pathname:'/ingredient-detail/' + ingredient.id,
            state: {"fromURL": "/ingredients"}
        });
    };

    render() {
        var spinner = null;
        if (this.state.ingredients.length < 1) {
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
                            this.state.ingredients.map(function(ingredient, i) { return (
                                <Grid key={i} item>
                                    <IngredientCard ingredient={ingredient} onClick={(e)=>this.openIngredientDetail(ingredient, e)}/>
                                </Grid>
                            )}, this)}/>
                    </div>
                </section>
            </div>
        )
    }
}
