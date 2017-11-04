import React from 'react';
import {Button} from 'react-bootstrap';

/* Local Imports */
import "../../static/css/about.css"
import backgroundStyle from "../constants.js"
import TipsySearchbar from "../components/TipsySearchbar";
import Spinner from "../components/Spinner";

/* Page that displays a grid of brands */
export default class BrandsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            brands: [],
            isLoading: false
        };

        this.openBrandDetail = this.openBrandDetail.bind(this);
        this.reload = this.reload.bind(this);
    }

    reload() {
        if (this.state.isLoading) {
            return;
        }

        this.state.isLoading = true;
        window.constants.api.getBrands().then(brands => {
            if (brands !== null) {
                this.setState({brands: brands});
            }
            this.state.isLoading = false;
        })
    }

    openBrandDetail(brand, event) {
        event.preventDefault();
        this.props.history.push({
            pathname:'/brand-detail/' + brand.id,
            state: {"fromURL": "/brands"}
        });
    };

    render() {

        // Activity indicator when cocktails have not loaded
        var spinner = null;
        if (this.state.brands.length < 1) {
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

                        {this.state.brands.map(function(brand, i) { return (
                            <div key={i} className = "col-md-3 col-md-offset-1 cocktail-box">
                                <img className= "img-responsive" src={"" + brand.image} />
                                <h5>{brand.name}</h5>
                                <p>{brand.description}</p>

                                <Button bsStyle="info" onClick={(e)=>this.openBrandDetail(brand, e)}>More</Button>
                            </div>
                        );}, this)}
                    </div>
                </section>
            </div>
        )
    }
}
