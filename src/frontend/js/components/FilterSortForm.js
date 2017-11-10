import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class FilterSortForm extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor={this.props.id}>{this.props.title}</InputLabel>
                <Select native value={this.props.default} onChange={this.props.onChange} className={classes.selectEmpty} input={<Input id={this.props.id}/>}>
                    <option value=""/>
                    {this.props.options}
                </Select>
            </FormControl>
        );
    }
}

FilterSortForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterSortForm);