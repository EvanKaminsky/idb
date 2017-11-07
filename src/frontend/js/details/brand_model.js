import React from 'react';

import "../components/Spinner"
import "../../static/css/cocktail.css"
import Spinner from "../components/Spinner";

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

export default class BrandDetailPage extends React.Component {

    constructor(props) {
        super(props);
        const prevState = this.props.location.state;

        this.state = {
            brand: null,
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
            console.log("No slug for brand detail");
            return;
        }

        this.state.isLoading = true;
        window.constants.api.getBrandDetail(slug).then(brand => {
            if (brand !== null) {
                this.setState({brand: brand});
            }
            this.state.isLoading = false;
        });
    };

    goBack(event) {
        event.preventDefault();
        this.props.history.push({pathname: this.state.fromURL});
    };

    render() {
        if (this.state.brand === null) {
            this.reload();
            return <Spinner/>
        }

        var backButton = null;
        if (this.state.fromURL) {
            backButton = <Button dense color="primary" onClick={(e)=>this.goBack(e)}>Back</Button>
        }

        return (
            <div className="col-md-6 cocktail-box">
                <img className="img-responsive" src={this.state.brand.image}/>

                <Typography type="display2" align="center" component="h1">{this.state.brand.name}</Typography>

                <Typography type="headline" component="h3">Description</Typography>
                <Typography component="p">{this.state.brand.description}</Typography>

                <Typography type="headline" component="h3">Cocktails</Typography>
                {this.state.brand.cocktails.map((element) => {
                      return(
                          <Typography component="p">{element.label}</Typography>
                      );
                    })
                }

                <Typography type="headline" component="h3">Ingredients</Typography>
                {this.state.brand.ingredients.map((element) => {
                      return(
                          <Typography component="p">{element.label}</Typography>
                      );
                    })
                }

                <Typography type="headline" component="h3">Countries</Typography>
                {this.state.brand.countries.map((element) => {
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

