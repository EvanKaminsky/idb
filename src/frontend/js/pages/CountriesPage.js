import React from 'react';

import GridPage from "./GridPage.js";
import CountryCard from "../cards/CountryCard.js";

export default class CountriesPage extends React.Component {
    render() {
        return <GridPage
            category="countries"
            detailURL="/country-detail/"
            descriptorFields="country_fields"
            parentState={this.props.location.state}
            parentHistory={this.props.history}
            constructCard={(element, action) => {
                return <CountryCard country={element} onClick={action}/>
            }}
        />
    }

}
