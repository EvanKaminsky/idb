import React from 'react';

/* Local Imports */
import API from "../api.js"
import "../../static/css/about.css"
import backgroundStyle from "../constants.js"
import TipsySearchbar from "../components/TipsySearchbar";

/* Page that displays a grid of cocktails */
export default class CocktailsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            cocktails: [],
            api: new API()
        }
    }

    componentDidMount() {
        this.reload()
    }

    reload() {
        this.state.api.getCocktails().then(cocktails => {
            if (cocktails !== null) {
                this.setState({cocktails: cocktails});
            }
        });
    };

    render() {
        return (
            <div style = {backgroundStyle}>

            <h1>Tipsy Mix</h1>

                <TipsySearchbar/>


            <section className = "container">
                <div className = "row">
                    {this.state.cocktails.map(function(cocktail, i) {
                        return(
                            <div key={i} className = "col-md-3 col-md-offset-1 cocktail-box">
                                <img className = "img-responsive" src={"" + cocktail.image} />
                                <h5>{cocktail.name}</h5>
                                <p>{cocktail.description}</p>
                                <a href={"" + cocktail.stdname} className="btn btn-info btn-log" role ="button">More</a>
                            </div>
                        );
                    })}
                </div>
            </section>
            </div>
        )
    }
}


