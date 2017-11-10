import React from 'react';

import "../../static/css/TipsySearchbar.css";
import TipsyButton from "./TipsyButton.js";
import TipsySearchField from "./TipsySearchField.js";

export default class TipsySearchbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {input: ""};
        this.edit = this.edit.bind(this);
        this.search = this.search.bind(this);
    }

    edit(event) {
        this.setState({input: event.target.value});
    }

    search(category, event, spin) {
        event.preventDefault();
        //if (this.state.input === "") {
        //    return Promise.resolve(null);
        //} else {
            spin();
            return window.constants.api.search(category, null, null, this.state.input);
        //}
    }

    render() {
        const placeholder = this.props.placeholder ? this.props.placeholder : "Search by ingredients, cocktail, country, or brand";
        const category    = this.props.category ? this.props.category : null;

        return (
            <div id = "searchForm">
                <input type="text" className="search" placeholder={placeholder} onChange={this.edit} onKeyPress={ (event) => {
                    if (event.charCode === 13) {
                        this.search(category, event, this.props.spin).then(results => this.props.relayout(results));
                    }
                }}/>

                <br/>

                <TipsyButton onClick={ (event) =>
                    this.search(category, event, this.props.spin).then(results => this.props.relayout(results))
                }/>
            </div>
        )
    }
}
