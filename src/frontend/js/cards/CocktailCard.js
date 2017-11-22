import React from 'react';

import AbstractCard from "./AbstractCard.js";

export default function CocktailCard(props) {
    return (
        <AbstractCard
            name={props.cocktail.name}
            imageurl={props.cocktail.imageurl}
            body={props.cocktail.highlights ? props.cocktail.highlights : props.cocktail.summary}
            onClick={props.onClick}
        />
    );
}
