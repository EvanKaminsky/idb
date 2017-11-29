import React from 'react';

import AbstractCard from "./AbstractCard.js";

export default function CountryCard(props) {
    return (
        <AbstractCard
            name={props.country.name}
            imageurl={props.country.imageurl}
            body={props.country.highlights ? props.country.highlights : props.country.summary}
            onClick={props.onClick}
        />
    );
}
