import React from 'react';

import GridPage from "./GridPage.js";
import CocktailCard from "../cards/CocktailCard.js";

export default class CocktailsPage extends React.Component {
    render() {
        return <GridPage
            category="cocktails"
            detailURL="/cocktail-detail/"
            descriptorFields="cocktail_fields"
            parentState={this.props.location.state}
            parentHistory={this.props.history}
            constructCard={(element, action) => {
                return <CocktailCard cocktail={element} onClick={action}/>
            }}
        />
    }

}
