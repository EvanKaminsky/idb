import React from 'react';

import AbstractCard from "./AbstractCard.js";

export default function BrandCard(props) {
    return (
        <AbstractCard
            name={props.brand.name}
            imageurl={props.brand.imageurl}
            body={props.brand.highlights ? props.brand.highlights : props.brand.summary}
            onClick={props.onClick}
        />
    );
}
