import React from 'react';

/* Local Imports */
import "../../static/css/loader.css";

export default class Spinner extends React.Component {
    render() {
        return (
            <div className="ui segment">
                <p/>
                <div className="ui active dimmer">
                    <div className="ui loader"/>
                </div>
            </div>
        )
    }
}


