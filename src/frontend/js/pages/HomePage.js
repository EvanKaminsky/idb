import React from 'react';

import "../../static/css/index.css"
let backgroundURL = "/static/public/index.jpg";

const background = {
    backgroundImage: 'url(' + backgroundURL + ')',
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
};

/* Page that displays the splash screen and carousel */
export default class HomePage extends React.Component {
    render() {
        return (
            <body style={background}>

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


