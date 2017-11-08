import React from 'react';
import Grid from 'material-ui/Grid';

import TipsySearchbar from "../components/TipsySearchbar";
import Spinner from "../components/Spinner";
import TipsyGrid from "../components/TipsyGrid.js";
import CountryCard from "../cards/CountryCard.js";
import Stepper from "../components/Stepper.js"

/* Page that displays a grid of countries */
export default class CountriesPage extends React.Component {

    constructor() {
        super();
        this.state = {
            elements: [],
            isLoading: false,

            current_page: 1,     // Pagination
            total_pages: 0,
            page_size: 10
        };

        this.openDetail = this.openDetail.bind(this);
        this.reload = this.reload.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
    }

    reload(page) {
        if (this.state.isLoading) {
            return;
        }

        this.state.isLoading = true;
        window.constants.api.getDescriptions();
        window.constants.api.getCountries(page, this.state.page_size).then(json => {
            if (json !== null) {
                this.setState({elements: json.results});
                this.setState({total_pages: json.totalPages});
                this.setState({current_page: json.page});
            }
            this.state.isLoading = false;
        });
    }

    openDetail(element, event) {
        event.preventDefault();
        this.props.history.push({
            pathname:'/country-detail/' + element.id,
            state: {"fromURL": "/countries"}
        });
    };

    render() {
        var spinner = null;
        var stepper = null;
        if (this.state.elements.length < 1) {
            this.reload(this.state.current_page);
            spinner = <Spinner/>;
        } else {
            stepper = <Stepper pages={this.state.total_pages} currentPage={this.state.current_page}
                               next={this.nextPage} back={this.previousPage}/>;
        }

        const renderElements = this.state.elements.map((element, i) => { return (
          <Grid key={i} item>
              <CountryCard country={element} onClick={(e)=>this.openDetail(element, e)}/>
          </Grid>
        )});

        return (
            <div>
                <h1>Tipsy Mix</h1>
                <TipsySearchbar/>
                <TipsyGrid elements={spinner !== null ? spinner : renderElements}/>
                {stepper}
            </div>
        )
    }

    /* Pagination */

    nextPage() {
        this.reload(this.state.current_page + 1);
    }

    previousPage() {
        this.reload(this.state.current_page - 1);
    }

}
