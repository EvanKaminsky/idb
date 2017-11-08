import React from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import "../../static/css/index.css"
import Spinner from "../components/Spinner.js";

export default class CountryDetailPage extends React.Component {

    constructor(props) {
        super(props);
        const prevState = this.props.location.state;

        this.state = {
            country: null,
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
            console.log("No slug for country detail");
            return;
        }

        this.state.isLoading = true;
        window.constants.api.getCountryDetail(slug).then(country => {
            if (country !== null) {
                this.setState({country: country});
            }
            this.state.isLoading = false;
        });
    };

    goBack(event) {
        event.preventDefault();
        console.log("Going back to: " + this.state.fromURL);
        this.props.history.push({pathname: this.state.fromURL});
    };

    render() {
        if (this.state.country === null) {
            this.reload();
            return <Spinner/>
        }

        var backButton = null;
        if (this.state.fromURL) {
            console.log("Generating button back to: " + this.state.fromURL);
            backButton = <Button dense color="primary" onClick={(e)=>this.goBack(e)}>Back</Button>
        }

        return (
            <div className="detail-box">
                    <img className="img-responsive" src={this.state.country.image}/>

                    <Typography type="display2" align="center" component="h1">{this.state.country.name}</Typography>
                    <Typography type="p" align="center" component="h4">{this.state.country.continent}</Typography>

                    <Typography type="headline" component="h3">Description</Typography>
                    <Typography component="p">{this.state.country.description}</Typography>

                    <Typography type="headline" component="h3">Brands</Typography>
                    {this.state.country.brands.map((element) => { return (
                        <Typography component="p">{element.label}</Typography>
                    );})}

                    <Typography type="headline" component="h3">Ingredients</Typography>
                    {this.state.country.ingredients.map((element) => { return (
                        <Typography component="p">{element.label}</Typography>
                    );})}

                    <Typography type="headline" component="h3">Cocktails</Typography>
                    {this.state.country.cocktails.map((element) => { return (
                        <Typography component="p">{element.label}</Typography>
                    );})}

                    {backButton}
            </div>
        );
    }

};

