import React from 'react';
import Grid from 'material-ui/Grid';

import TipsySearchbar from "../components/TipsySearchbar";
import Spinner from "../components/Spinner";
import TipsyGrid from "../components/TipsyGrid.js";
import BrandCard from "../cards/BrandCard.js";

import backgroundStyle from "../constants.js"

/* Page that displays a grid of brands */
export default class BrandsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            brands: [],
            descriptions: [],
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
        });

        window.constants.api.getDescriptions().then(descriptions => {
            if (descriptions !== null) {
                this.setState({descriptions: descriptions});
            }
        });
    }

    openBrandDetail(brand, event) {
        event.preventDefault();
        this.props.history.push({
            pathname:'/brand-detail/' + brand.id,
            state: {"fromURL": "/brands"}
        });
    };

    render() {
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

                        <TipsyGrid elements={spinner !== null ? spinner :
                            this.state.brands.map(function(brand, i) { return (
                            <Grid key={i} item>
                                <BrandCard brand={brand} onClick={(e)=>this.openBrandDetail(brand, e)}/>
                            </Grid>
                        )}, this)}/>
                    </div>
                </section>
            </div>
        )
    }
}
