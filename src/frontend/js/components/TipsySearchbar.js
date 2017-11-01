import React from 'react';

/* Local Imports */
import "../../static/css/TipsySearchbar.css"

export default class TipsySearchbar extends React.Component {
    render() {
        return (
             <div id = "searchForm">
                <input type="text" className="search" placeholder="Search by ingredients, cocktail, country, or brand" /><br/>
                <input type="submit" className="searchButton" placeholder="Search"/>
            </div>
        )
    }
}
