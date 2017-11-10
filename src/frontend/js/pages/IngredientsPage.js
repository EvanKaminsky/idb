import React from 'react';
import Grid from 'material-ui/Grid';

import TipsySearchbar from "../components/TipsySearchbar";
import Spinner from "../components/Spinner";
import TipsyGrid from "../components/TipsyGrid.js";
import IngredientCard from "../cards/IngredientCard.js";
import Stepper from "../components/Stepper.js"
import FilterSort from "../components/FilterSort.js";

/* Page that displays a grid of ingredients */
export default class IngredientsPage extends React.Component {

    constructor(props) {
        super(props);
        const prev_state = this.props.location.state;

        this.state = {
            elements:     prev_state ? (prev_state.elements ? prev_state.elements : null) : null,
            current_page: prev_state ? (prev_state.current_page !== null ? prev_state.current_page : 1) : 1,
            total_pages:  prev_state ? (prev_state.total_pages  !== null ? prev_state.total_pages  : 0) : 0,
            page_size:    prev_state ? (prev_state.page_size    !== null ? prev_state.page_size    : 10) : 10,
            descriptors:  null,
            isLoading: false,
            filter_sort_string: null,
            filter_sort_state: null
        };

        this.openDetail = this.openDetail.bind(this);
        this.reload = this.reload.bind(this);
        this.relayout = this.relayout.bind(this);
        this.setDescriptors = this.setDescriptors.bind(this);
        this.updateFilterSort = this.updateFilterSort.bind(this);
        this.spin = this.spin.bind(this);
    }

    reload(page, filterSortString) {
        if (this.state.isLoading) {
            return;
        }
        this.state.isLoading = true;
        window.constants.api.getDescriptions().then(json => this.setDescriptors(json));
        window.constants.api.search("ingredients", page, this.state.page_size, null, filterSortString).then(json => {
            this.relayout(json);
        });
    };

    relayout(json) {
        this.state.isLoading = false;
        if (json !== null) {
            this.setState({
                elements:           json.results,
                total_pages:        json.totalPages,
                current_page:       json.page,
                filter_sort_string: json.filter
            });
        }
    }

    setDescriptors(json) {
        if (this.state.descriptors === null && json !== null && json.ingredient_fields !== null) {
            this.setState({descriptors: json.ingredient_fields.map(field => field.Field)});
        }
    }

    updateFilterSort(filterSortString, filterSortState) {
        if (filterSortString !== null && this.state.filter_sort_string === null) {
            this.reload(null, filterSortString);
        } else if (filterSortString !== null && this.state.filter_sort_string !== null && filterSortString !== this.state.filter_sort_string) {
            this.reload(null, filterSortString);
        } else if (filterSortString === null && this.state.filter_sort_string !== null) {
            this.reload(null, null);
        }
    }

    spin() {
        this.setState({isLoading: true});
    }

    openDetail(element, event) {
        event.preventDefault();
        this.props.history.push({
            pathname: '/ingredient-detail/' + element.id,
            state: {fromURL: "/ingredients"}
        });
    };

    render() {
        var display = null;
        var stepper = null;
        var filtersort = null;

        if (this.state.isLoading) {
            display = <Spinner/>;
        } else if (this.state.elements === null) {
            this.reload(this.state.current_page, this.state.filter_sort_string);
            display = <Spinner/>;
        } else {
            display = this.state.elements.map((element, i) => { return (
                <Grid key={i} item>
                    <IngredientCard ingredient={element} onClick={(e)=>this.openDetail(element, e)}/>
                </Grid>
            )});

            stepper = <Stepper pages={this.state.total_pages} currentPage={this.state.current_page}
                               next={(e)=>this.reload(this.state.current_page + 1, this.state.filter_sort_string)}
                               back={(e)=>this.reload(this.state.current_page - 1, this.state.filter_sort_string)}/>;

            filtersort = <FilterSort descriptors={this.state.descriptors} state={this.filter_sort_state} updateFilterSort={this.updateFilterSort}/>;
        }

        return (
            <div>
                <h1>Tipsy Mix</h1>
                <TipsySearchbar category={"ingredients"} placeholder="Search for ingredients" spin={this.spin} relayout={this.relayout}/>
                {filtersort}
                <TipsyGrid elements={display}/>
                {stepper}
            </div>
        )
    }

}
