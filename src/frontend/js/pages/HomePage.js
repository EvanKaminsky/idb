import React from 'react';

import "../../static/css/index.css"
import backgroundStyle from "../constants.js"
import TipsySearchbar from "../components/TipsySearchbar";
import Spinner from "../components/Spinner";

/* Page that displays the splash screen and carousel */
export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoading: false};

        this.search = this.search.bind(this);
        this.relayout = this.relayout.bind(this);
        this.spin = this.spin.bind(this);
    }

    spin() {
        this.setState({isLoading: true});
    }

    search(query) {
        if (this.state.isLoading) {
            return;
        }
        this.state.isLoading = true;
        window.constants.api.search(null, null, null, query, null).then(json => {
            this.relayout(json);
        });
    }

    relayout(json) {
        if (json === null) {
            this.setState({isLoading: false});
            return;
        }

        var path = "/";
        if (json.category === "COCKTAILS") {
            path = "/cocktails";
        } else if (json.category === "INGREDIENTS") {
            path = "/ingredients";
        } else if (json.category === "BRANDS") {
            path = "/brands";
        } else if (json.category === "COUNTRIES") {
            path = "/countries";
        }

        this.props.history.push({
            pathname: path,
            state: {
                elements:     json.results,
                current_page: json.page,             // Stepper back bug | json.results.length > 0 ? json.page : 0,
                total_pages:  json.totalPages,
                page_size:    json.count
            }
        });
    }

    render() {
        const display = this.state.isLoading ? <Spinner/> : <TipsySearchbar spin={this.spin} searchAction={this.search}/>;

        return (
            <div style={backgroundStyle}>
                <br/>
                <h1>Tipsy Mix</h1>
                <br/>
                {display}
            </div>
        )
    }
}


