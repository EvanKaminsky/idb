import React from 'react';

import GridPage from "./GridPage.js";
import BrandCard from "../cards/BrandCard.js";

export default class  BrandsPage extends React.Component {
    render() {
        return <GridPage
            category="brands"
            detailURL="/brand-detail/"
            descriptorFields="brand_fields"
            parentState={this.props.location.state}
            parentHistory={this.props.history}
            constructCard={(element, action) => {
                return <BrandCard brand={element} onClick={action}/>
            }}
        />
    }

}
