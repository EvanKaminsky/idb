import React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import "../../static/css/index.css"
import Spinner from "../components/Spinner.js";
import DetailMultiSection from "./DetailMultiSection.js";
import DetailSingleSection from "./DetailSingleSection.js";

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

                    <DetailSingleSection title="Description" label={this.state.ingredient.description}/>

                    <DetailMultiSection type="cocktail" elements={this.state.ingredient.cocktails} history={this.props.history} location={this.props.location}/>
                    <DetailMultiSection type="brand" elements={this.state.ingredient.brands} history={this.props.history} location={this.props.location}/>
                    <DetailMultiSection type="country" elements={this.state.ingredient.countries} history={this.props.history} location={this.props.location}/>

                    {backButton}
            </div>
        );
    }

};

