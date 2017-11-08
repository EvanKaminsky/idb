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
                    <img className="img-responsive" src={this.state.cocktail.image}/>

                    <Typography type="display2" align="center" component="h1">{this.state.cocktail.name}</Typography>

                    <DetailSingleSection title="Description" label={this.state.cocktail.description}/>

                    <DetailMultiSection type="ingredient" elements={this.state.cocktail.ingredients} history={this.props.history} location={this.props.location}/>
                    <DetailMultiSection type="country" elements={this.state.cocktail.countries} history={this.props.history} location={this.props.location}/>
                    <DetailMultiSection type="brand" elements={this.state.cocktail.brands} history={this.props.history} location={this.props.location}/>

                    {backButton}
            </div>
        );
    }

};

