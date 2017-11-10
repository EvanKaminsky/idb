import React from 'react';

import GridPage from "./GridPage.js";
import IngredientCard from "../cards/IngredientCard.js";

export default class IngredientsPage extends React.Component {
    render() {
        return <GridPage
            category="ingredients"
            detailURL="/ingredient-detail/"
            descriptorFields="ingredient_fields"
            parentState={this.props.location.state}
            parentHistory={this.props.history}
            constructCard={(element, action) => {
                return <IngredientCard ingredient={element} onClick={action}/>
            }}
        />
    }

}
