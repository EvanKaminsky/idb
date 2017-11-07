import React from 'react';
import Grid from 'material-ui/Grid';

import TipsySearchbar from "../components/TipsySearchbar";
import Spinner from "../components/Spinner";
import TipsyGrid from "../components/TipsyGrid.js";
import CocktailCard from "../cards/CocktailCard.js";

/* Page that displays a grid of cocktails */
export default class CocktailsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cocktails: [],
            descriptions: [],
            isLoading: false
        };

        this.openCocktailDetail = this.openCocktailDetail.bind(this);
        this.reload = this.reload.bind(this);
    }

    reload() {
        if (this.state.isLoading) {
            return;
        }

        this.state.isLoading = true;
        window.constants.api.getCocktails().then(cocktails => {
            if (cocktails !== null) {
                this.setState({cocktails: cocktails});
            }
            this.state.isLoading = false;
        });

        window.constants.api.getDescriptions().then(descriptions => {
            if (descriptions !== null) {
                this.setState({descriptions: descriptions});
            }
        });
    };

    openCocktailDetail(cocktail, event) {
        event.preventDefault();
        this.props.history.push({
            pathname: '/cocktail-detail/' + cocktail.id,
            state: {"fromURL": "/cocktails"}
        });
    };

    render() {
        var spinner = null;
        if (this.state.cocktails.length < 1) {
            this.reload();
            spinner = <Spinner/>
        }

        return (
            <div>
                <h1>Tipsy Mix</h1>

                <TipsySearchbar/>

                <TipsyGrid elements={spinner !== null ? spinner :
                    this.state.cocktails.map(function(cocktail, i) { return (
                    <Grid key={i} item>
                        <CocktailCard cocktail={cocktail} onClick={(e)=>this.openCocktailDetail(cocktail, e)}/>
                    </Grid>
                )}, this)}/>
            </div>
        )
    }

}
