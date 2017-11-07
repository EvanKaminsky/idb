import React from 'react';

import "../components/Spinner"
import "../../static/css/cocktail.css"
import Spinner from "../components/Spinner";

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

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
            backButton = <Button dense color="primary" onClick={(e)=>this.goBack(e)}>Back</Button>
        }

        {console.log("MEMEMEME")}

        return (
            <div className="col-md-6 cocktail-box">
                <img className="img-responsive" src={this.state.cocktail.image}/>

                <Typography type="display2" align="center" component="h1">{this.state.cocktail.name}</Typography>

                <Typography type="headline" component="h3">Description</Typography>
                <Typography component="p">{this.state.cocktail.description}</Typography>

                <Typography type="headline" component="h3">Ingredients</Typography>
                {this.state.cocktail.ingredients.map((element) => {
                      return(
                          <ul>{element.label}</ul>
                      );
                    })
                }

                <Typography type="headline" component="h3">Instructions</Typography>
                <Typography component="p">{this.state.cocktail.instructions}</Typography>

                <Typography type="headline" component="h3">Brands</Typography>
                <Typography component="p">{this.state.cocktail.brands}</Typography>

                <Typography type="headline" component="h3">Countries</Typography>
                {this.state.cocktail.countries.map((element) => {
                      return(
                          <Typography component="p">{element.label}</Typography>
                      );
                    })
                }


                {backButton}
            </div>
        );
    }

};

