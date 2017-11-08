import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import "../../static/css/index.css"
import Spinner from "../components/Spinner.js";
import DetailMultiSection from "./DetailMultiSection.js";
import DetailSingleSection from "./DetailSingleSection.js";

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

        return (
            <div className="detail-box">
                    <img className="img-responsive" align="center" src={this.state.cocktail.image}/>

                    <Typography type="display3">{this.state.cocktail.name}</Typography>

                    <DetailSingleSection title="Description" label={this.state.cocktail.description}/>
                    <DetailSingleSection title="Base Spirit" label={this.state.cocktail.base_spirit}/>
                    <DetailSingleSection title="Garnish" label={this.state.cocktail.garnish}/>
                    <DetailSingleSection title="Glass" label={this.state.cocktail.glass}/>
                    <DetailSingleSection title="Instructions" label={this.state.cocktail.instructions}/>
                    <DetailSingleSection title="Preparation" label={this.state.cocktail.preparation}/>
                    <DetailSingleSection title="Video" label={this.state.cocktail.video}/>

                    <DetailMultiSection type="ingredient" elements={this.state.cocktail.ingredients} history={this.props.history} location={this.props.location}/>
                    <DetailMultiSection type="country" elements={this.state.cocktail.countries} history={this.props.history} location={this.props.location}/>
                    <DetailMultiSection type="brand" elements={this.state.cocktail.brands} history={this.props.history} location={this.props.location}/>

                    {backButton}
            </div>
        );
    }

};

