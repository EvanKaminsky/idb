import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import API from "./api.js";
import TipsyNavbar from "./components/TipsyNavbar.js";

import HomePage         from './pages/HomePage.js';
import CocktailsPage    from './pages/CocktailsPage.js';
import IngredientsPage  from './pages/IngredientsPage.js';
import BrandsPage       from './pages/BrandsPage.js';
import CountriesPage    from './pages/CountriesPage.js';
import AboutPage        from './pages/AboutPage.js';
import CocktailModel    from './details/cocktail_model.js'
import BrandModel       from './details/brand_model.js'

import CocktailDetailPage   from "./details/cocktail_model.js";
import IngredientDetailPage from "./details/ingredient_model.js";
import BrandDetailPage      from "./details/brand_model.js";
import CountryDetailPage    from "./details/country_model.js";

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class TipsyApp extends React.Component {

    componentWillMount() {
        window.constants = {
            api: new API()
        };
    }

    render() { return (
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

                    <Route path='/cocktail-detail/:slug'    component={CocktailDetailPage}/>
                    <Route path='/ingredient-detail/:slug'  component={IngredientDetailPage}/>
                    <Route path='/brand-detail/:slug'       component={BrandDetailPage}/>
                    <Route path='/country-detail/:slug'     component={CountryDetailPage}/>
                </Switch>

<<<<<<< HEAD
const brands = require('json-loader!../spoof/testdata_brand.json');
const cocktails = require('json-loader!../spoof/testdata_cocktail.json');
const countries = require('json-loader!../spoof/testdata_country.json');

ReactDOM.render((
    <BrowserRouter>
        <div>
=======
            </div>
        </BrowserRouter>
    )}
>>>>>>> b365926e94754beed2ca810bd1935e0ff7d52414

}

<<<<<<< HEAD
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
=======
ReactDOM.render(<TipsyApp/>, document.getElementById('reactEntry'));
>>>>>>> b365926e94754beed2ca810bd1935e0ff7d52414


