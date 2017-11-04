import React from 'react';
import {Button} from 'react-bootstrap';

/* Local Imports */
import "../../static/css/about.css"
import backgroundStyle from "../constants.js"
import TipsySearchbar from "../components/TipsySearchbar";
import Spinner from "../components/Spinner";

/* Page that displays a grid of cocktails */
export default class CocktailsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cocktails: [],
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
    };

    openCocktailDetail(cocktail, event) {
        event.preventDefault();
        this.props.history.push({pathname:'/cocktail-detail/' + cocktail.id, state: {"cocktail": cocktail, "fromCocktails": true}});
    };

    render() {

        // Activity indicator when cocktails have not loaded
        var spinner = null;
        if (this.state.cocktails.length < 1) {
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

                        {this.state.cocktails.map(function(cocktail, i) { return (
                            <div key={i} className = "col-md-3 col-md-offset-1 cocktail-box">
                                <img className = "img-responsive" src={"" + cocktail.image} />
                                <h5>{cocktail.name}</h5>
                                <p>{cocktail.description}</p>

                                <Button bsStyle="info" onClick={(e)=>this.openCocktailDetail(cocktail, e)}>More</Button>
                            </div>
                        );}, this)}
                    </div>
                </section>
            </div>
        )
    }

}