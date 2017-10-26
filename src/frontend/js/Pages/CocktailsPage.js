import React from 'react';

import Page from "./Page.js";

const url = "https://tipsymix-ttp.appspot.com/api/cocktails/api/search"

export default class CocktailsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            cocktails: [],
        }
    }

    componentDidMount() {
        fetch(url).then(response => {
            return response.json()
        }).then(data => {
            this.setState({cocktails: data.result});
            console.log("state", this.state.cocktails);
        }).catch((error) => {
            console.error(error);
        })
    }

    render() {
        return (
            <div>
                <Page title="Cocktails"/>

                console.log(this.state.cocktails)
            </div>
        )
    }
}


