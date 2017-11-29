import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import TipsySearchbar from "../components/TipsySearchbar";
import Spinner from "../components/Spinner";
import TipsyGrid from "../components/TipsyGrid.js";
import Stepper from "../components/Stepper.js"
import FilterSort from "../components/FilterSort.js";

import { backgroundStyle } from "../constants.js";

export default class GridPage extends React.Component {

    // Required Props: category, parentState, parentHistory, detailURL, descriptorFields, constructCard

    // Setup //

    constructor(props) {
        super(props);
        const prev_state = this.props.parentState;

        this.state = {
            elements:     prev_state ? (prev_state.elements ? prev_state.elements : null) : null,
            history:      this.props.parentHistory,
            descriptors:  null,
            isLoading:    false,

            page:         prev_state ? (prev_state.page !== null ? prev_state.page : 1) : 1,
            total_pages:  prev_state ? (prev_state.total_pages  !== null ? prev_state.total_pages  : 0) : 0,
            page_size:    prev_state ? (prev_state.page_size    !== null ? prev_state.page_size    : 10) : 10,

            query:  null,
            filter: null,
        };

        this.reload = this.reload.bind(this);
        this.filter = this.filter.bind(this);
        this.search = this.search.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.relayout = this.relayout.bind(this);
        this.openDetail = this.openDetail.bind(this);
    }

    componentDidMount() {
        window.constants.api.getDescriptions(this.props.descriptorFields).then(fields => {
            if (this.state.descriptors === null && fields !== null) {
                this.setState({descriptors: fields});
            }
        });
    }


    // Networking  //

    reload(page, query, filter) {
        if (this.state.isLoading) {
            return;
        }
        this.state.isLoading = true;
        window.constants.api.search(this.props.category, page, this.state.page_size, query, filter).then(json => {
            this.relayout(json);
        });
    };

    filter(filter, filterSortState) {
        if (filter !== null && this.state.filter === null) {
            this.reload(null, this.state.query, filter);
        } else if (filter !== null && this.state.filter !== null && filter !== this.state.filter) {
            this.reload(null, this.state.query, filter);
        } else if (filter === null && this.state.filter !== null) {
            this.reload(null, this.state.query, null);
        }
    }

    search(query) {
        this.setState({isLoading: true});   // Start spinning
        this.reload(this.state.page, query, this.state.filter);
    }

    nextPage() {
        this.reload(this.state.page + 1, this.state.query, this.state.filter)
    }

    previousPage() {
        this.reload(this.state.page - 1, this.state.query, this.state.filter)
    }

    // State Setters //

    relayout(json) {
        this.state.isLoading = false;
        if (json !== null) {
            this.setState({
                elements:    json.results,
                total_pages: json.totalPages,
                page:   json.page,
                filter: json.filter,
                query:  json.query
            });
        }
    }


    // Local //

    openDetail(element, event) {
        event.preventDefault();
        this.state.history.push({
            pathname: this.props.detailURL + element.id,
            state: {fromURL: "/" + this.props.category}
        });
    };

    render() {
        var display = null;
        var stepper = null;

        if (this.state.isLoading) {
            display = <Spinner/>;
        } else if (this.state.elements === null) {
            this.reload(this.state.page, this.state.query, this.state.filter);
            display = <Spinner/>;

        } else {
            display = this.state.elements.map((element, i) => { return (
                <Grid key={i} item>
                    {this.props.constructCard(element, (e)=>this.openDetail(element, e))}
                </Grid>
            )});

            stepper = <Stepper pages={this.state.total_pages} currentPage={this.state.page} next={this.nextPage} back={this.previousPage}/>;
        }

        const placeholder = "Search for " + this.props.category + "...";

        return (
            <div className={{backgroundStyle}}>
                <h1>Tipsy Mix</h1>
                <TipsySearchbar category={this.props.category} placeholder={placeholder} searchAction={this.search}/>

                <FilterSort
                    descriptors={this.state.descriptors}
                    state={this.filter_state}
                    filterAction={this.filter}
                    pagination={[this.state.page, this.state.total_pages]}
                />

                {stepper}

                <TipsyGrid elements={display}/>
            </div>
        )
    }

}
