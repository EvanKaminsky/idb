import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import HomePage         from './Pages/HomePage.js';
import CocktailsPage    from './Pages/CocktailsPage.js';
import IngredientsPage  from './Pages/IngredientsPage.js';
import BrandsPage       from './Pages/BrandsPage.js';
import AboutPage        from './Pages/AboutPage.js';

import TipsyNavbar from "./TipsyNavbar.js";

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
            </Switch>

        </div>
    </BrowserRouter>
), document.getElementById('reactEntry'));

