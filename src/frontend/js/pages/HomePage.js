import React from 'react';

import "../../static/css/index.css"
import backgroundStyle from "../constants.js"
import TipsySearchbar from "../components/TipsySearchbar";

/* Page that displays the splash screen and carousel */
export default class HomePage extends React.Component {
    render() {
        return (
            <div style={backgroundStyle}>

            <br/>
            <h1>Tipsy Mix</h1>
            <br/>

            <TipsySearchbar/>

            </div>
        )
    }
}


