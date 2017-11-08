import React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import "../../static/css/index.css"
import Spinner from "../components/Spinner.js";

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
            return <Spinner/>;
        }

        var backButton = null;
        if (this.state.fromURL) {
            backButton = <Button dense color="primary" onClick={(e)=>this.goBack(e)}>Back</Button>
        }

        return (
            <div className="detail-box">
                    <img className="img-responsive" src={this.state.ingredient.image}/>

                    <Typography type="display2" align="center" component="h1">{this.state.ingredient.name}</Typography>

                    <Typography type="headline" component="h3">Description</Typography>
                    <Typography component="p">{this.state.ingredient.description}</Typography>

                    <Typography type="headline" component="h3">Cocktails</Typography>
                    {this.state.ingredient.cocktails.map((element) => { return (
                        <Typography component="p">{element.label}</Typography>
                    );})}

                    <Typography type="headline" component="h3">Brands</Typography>
                    <Typography component="p">{this.state.ingredient.brands}</Typography>

                    <Typography type="headline" component="h3">Countries</Typography>
                    {this.state.ingredient.countries.map((element) => { return (
                        <Typography component="p">{element.label}</Typography>
                    );})}

                    {backButton}
            </div>
        );
    }

};

