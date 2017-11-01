import React from 'react';

/* Local Imports */
import API from "../api.js"
import "../../static/css/about.css"
import backgroundStyle from "../constants.js"
import TipsySearchbar from "../components/TipsySearchbar";

/* Page that displays a grid of brands */
export default class BrandsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            brands: [],
            api: new API()
        }
    }

    componentDidMount() {
        this.reload()
    }

    reload() {
        this.state.api.getBrands(brands => {
            if (brands !== null) {
                this.setState({brands: brands});
            }
        })
    }

    render() {
        return (
            <div style={backgroundStyle}>

            <h1>Tipsy Mix</h1>

                <TipsySearchbar/>

            <section className = "container">
                <div className = "row">
                    {this.state.brands.map(function(brand, i) {
                        return(
                            <div key={i} className = "col-md-3 col-md-offset-1 cocktail-box">
                                <img className= "img-responsive" src={"" + brand.image} />
                                <h5>{brand.name}</h5>
                                <p>{brand.description}</p>
                                <a href={"" + brand.stdname} className="btn btn-info btn-log" role ="button">More</a>
                            </div>
                        );
                    })}
                </div>
            </section>

            </div>
        )
    }
}