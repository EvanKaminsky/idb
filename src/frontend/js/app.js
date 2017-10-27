import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import HomePage         from './pages/HomePage.js';
import CocktailsPage    from './pages/CocktailsPage.js';
import IngredientsPage  from './pages/IngredientsPage.js';
import BrandsPage       from './pages/BrandsPage.js';
import CountriesPage    from './pages/CountriesPage.js';
import AboutPage        from './pages/AboutPage.js';

import TipsyNavbar from "./components/TipsyNavbar.js";

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
            </Switch>

        </div>
    </BrowserRouter>
), document.getElementById('reactEntry'));

