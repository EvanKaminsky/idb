import React from 'react';

import "../../static/css/TipsySearchbar.css";
import TipsyButton from "./TipsyButton.js";

export default class TipsySearchbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {input: ""};
        this.edit = this.edit.bind(this);
        this.search = this.search.bind(this);
        this.pressedKey = this.pressedKey.bind(this);
    }

    edit(event) {
        this.setState({input: event.target.value});
    }

    search() {
        this.props.searchAction(this.state.input);
    }

    pressedKey(event) {
        if (event.charCode === 13) {
            this.search();
        }
    }

    render() {
        const placeholder = this.props.placeholder ? this.props.placeholder : "Best category search for cocktails, ingredients, brands, and countries";

        return (
            <div id = "searchForm">
                <input type="text" className="search" placeholder={placeholder} onChange={this.edit} onKeyPress={this.pressedKey}/>
                <br/>
                <TipsyButton onClick={this.search}/>
            </div>
        )
    }
}
