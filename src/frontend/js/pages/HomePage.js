import React from 'react';

/* Local Imports */
import "../../static/css/index.css"
import "../constants.js"

/* Page that displays the splash screen and carousel */
export default class HomePage extends React.Component {
    render() {
        return (
            <body style={backgroundStyle}>

            <br/>
            <h1>Tipsy Mix</h1>
            <br/>

            <div id = "searchForm">
                <input type="text" className="search" placeholder="Search by ingredients, cocktail, country, or brand"/>
                <br/>
                <input type="submit" className="searchButton" placeholder="Search"/>
            </div>

            </body>
        )
    }
}


