import React from 'react';
import Grid from 'material-ui/Grid';

import TipsySearchbar from "../components/TipsySearchbar";
import Spinner from "../components/Spinner";
import TipsyGrid from "../components/TipsyGrid.js";
import CocktailCard from "../cards/CocktailCard.js";
import Stepper from "../components/Stepper.js"

/* Page that displays a grid of cocktails */
export default class CocktailsPage extends React.Component {

    constructor(props) {
        super(props);
        const prev_state = this.props.location.state;

        this.state = {
            elements:     prev_state ? (prev_state.elements ? prev_state.elements : null) : null,
            current_page: prev_state ? (prev_state.current_page !== null ? prev_state.current_page : 1) : 1,
            total_pages:  prev_state ? (prev_state.total_pages  !== null ? prev_state.total_pages  : 0) : 0,
            page_size:    prev_state ? (prev_state.page_size    !== null ? prev_state.page_size    : 10) : 10,
            isLoading: false,
        };

        this.openDetail = this.openDetail.bind(this);
        this.reload = this.reload.bind(this);
        this.relayout = this.relayout.bind(this);
        this.spin = this.spin.bind(this);
    }

    reload(page) {
        if (this.state.isLoading) {
            return;
        }
        this.state.isLoading = true;
        window.constants.api.getDescriptions();
        window.constants.api.getCocktails(page, this.state.page_size).then(json => this.relayout(json));
    };

    relayout(json) {
        this.state.isLoading = false;
        if (json !== null) {
            this.setState({
                elements:     json.results,
                total_pages:  json.totalPages,
                current_page: json.page
            });
        }
    }

    spin() {
        this.setState({isLoading: true});
    }

    openDetail(element, event) {
        event.preventDefault();
        this.props.history.push({
            pathname: '/cocktail-detail/' + element.id,
            state: {fromURL: "/cocktails"}
        });
    };

    render() {
        var display = null;
        var stepper = null;

        if (this.state.isLoading) {
            display = <Spinner/>;
        } else if (this.state.elements === null) {
            this.reload(this.state.current_page);
            display = <Spinner/>;
        } else {
            display = this.state.elements.map((element, i) => { return (
                <Grid key={i} item>
                    <CocktailCard cocktail={element} onClick={(e)=>this.openDetail(element, e)}/>
                </Grid>
            )});

            stepper = <Stepper pages={this.state.total_pages} currentPage={this.state.current_page}
                               next={(e)=>this.reload(this.state.current_page + 1)}
                               back={(e)=>this.reload(this.state.current_page - 1)}/>;
        }

        return (
            <div>
                <h1>Tipsy Mix</h1>
                <TipsySearchbar category={"cocktails"} spin={this.spin} relayout={this.relayout}/>
                <TipsyGrid elements={display}/>
                {stepper}
            </div>
        )
    }

}
