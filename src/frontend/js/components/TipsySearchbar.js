import React from 'react';

/* Local Imports */
import "../../static/css/TipsySearchbar.css";
import TipsyButton from "./TipsyButton.js";
import TipsySearchField from "./TipsySearchField.js";

export default class TipsySearchbar extends React.Component {
    render() {
        return (
             <div id = "searchForm">
                <input type="text" className="search" placeholder="Search by ingredients, cocktail, country, or brand" /><br/>
                 <TipsyButton/>
            </div>
        )
    }
}
