import React from 'react';

import AbstractCard from "./AbstractCard.js";

export default function IngredientCard(props) {
    return (
        <AbstractCard
            name={props.ingredient.name}
            imageurl={props.ingredient.imageurl}
            body={props.ingredient.highlights ? props.ingredient.highlights : props.ingredient.summary}
            onClick={props.onClick}
        />
    );
}
