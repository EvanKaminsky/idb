import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import FilterSortForm from "./FilterSortForm.js";
import FilterSortField from "./FilterSortField.js";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    root :{
        backgroundColor: '#FFFFFF',
        margin: theme.spacing.unit,
    }
});

class FilterSort extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sort:          props.state ? (props.state.sort          ? props.state.sort          : "") : "",
            sort_option:   props.state ? (props.state.sort_option   ? props.state.sort_option   : "") : "",
            filter:        props.state ? (props.state.filter        ? props.state.filter        : "") : "",
            filter_option: props.state ? (props.state.filter_option ? props.state.filter_option : "") : "",
        };
        this.generateFilterSortString = this.generateFilterSortString.bind(this);
    }

    generateFilterSortString() {
        var sort_string = null;
        var filter_string = null;

        if (this.state.sort !== "" && this.state.sort_option !== "") {
            sort_string = "s-([" + this.state.sort + "][" + this.state.sort_option + "])";
        }

        if (this.state.filter !== "" && this.state.filter_option !== "") {
            filter_string = "f-([" + this.state.filter + "][" + this.state.filter_option + "])";
        }

        var combined_string = "";
        if (sort_string !== null) {
            combined_string += sort_string;
        }
        if (filter_string !== null) {
            combined_string += filter_string;
        }

        if (combined_string === "") {
            this.props.updateFilterSort(null, this.state);
        } else {
            this.props.updateFilterSort(combined_string, this.state);
        }
    }

    render() {
        const { classes } = this.props;

        var field_option_elements = null;
        if (this.props.descriptors !== null) {
            field_option_elements = this.props.descriptors.map((descriptor, i) => { return (
                <option key={i} value={descriptor}>{descriptor}</option>
            )});
        }

        const sort_option_elements = [<option key={1} value={"d"}>A-Z</option>, <option key={2} value={"a"}>Z-A</option>];

        return (
            <Grid container className={classes.root}>
                <FilterSortForm title="Sort" id="sort" default={this.state.sort} options={field_option_elements} onChange={ (event) => {
                    this.setState({sort: event.target.value}, function stateUpdateComplete() {
                        this.generateFilterSortString();
                    }.bind(this));
                }}/>
                <FilterSortForm title="Sort By" id="sort-option" default={this.state.sort_option} options={sort_option_elements} onChange={ (event) => {
                    this.setState({sort_option: event.target.value}, function stateUpdateComplete() {
                        this.generateFilterSortString();
                    }.bind(this));
                }}/>
                <FilterSortForm title="Filter" id="filter" default={this.state.filter} options={field_option_elements} onChange={ (event) => {
                    this.setState({filter: event.target.value}, function stateUpdateComplete() {
                        this.generateFilterSortString();
                    }.bind(this));
                }}/>
                 <FilterSortField title="Filter By" id="filter-option" default={this.state.filter_option} onChange={ (event) => {
                    this.setState({filter_option: event.target.value}, function stateUpdateComplete() {
                        this.generateFilterSortString();
                    }.bind(this));
                }}/>
            </Grid>
        );
    }
}

FilterSort.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterSort);