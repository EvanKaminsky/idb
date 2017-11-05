import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import HomePage         from './pages/HomePage.js';
import CocktailsPage    from './pages/CocktailsPage.js';
import IngredientsPage  from './pages/IngredientsPage.js';
import BrandsPage       from './pages/BrandsPage.js';
import CountriesPage    from './pages/CountriesPage.js';
import AboutPage        from './pages/AboutPage.js';
import CocktailModel    from './details/cocktail_model.js'
import BrandModel       from './details/brand_model.js'

import TipsyNavbar from "./components/TipsyNavbar.js";

const brands = require('json-loader!../spoof/testdata_brand.json');
const cocktails = require('json-loader!../spoof/testdata_cocktail.json');
const countries = require('json-loader!../spoof/testdata_country.json');

ReactDOM.render((
    <BrowserRouter>
        <div>

            <TipsyNavbar/>

            <Switch>
                <Route exact path='/'       component={HomePage}/>
                <Route path='/cocktails'    component={CocktailsPage}/>
                <Route path='/ingredients'  component={IngredientsPage}/>
                <Route path='/brands'       component={BrandsPage}/>
                <Route path='/about'        component={AboutPage}/>
                <Route path='/countries'    component={CountriesPage}/>
                {brands.map(function(item, i) {
                    return(<Route path={'/' + item.stdname} component={BrandModel}/>);
                })}
                {cocktails.map(function(item, i) {
                    return(<Route path={'/' + item.stdname} component={CocktailModel}/>);
                })}
                {countries.map(function(item, i) {
                    return(<Route path={'/' + item.stdname} component={AboutPage}/>);
                })}
            </Switch>

        </div>
    </BrowserRouter>
), document.getElementById('reactEntry'));

