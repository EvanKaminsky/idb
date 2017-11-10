import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class FilterSortField extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor={this.props.id}>{this.props.title}</InputLabel>
                <TextField value={this.props.default} onChange={this.props.onChange} className={classes.textField} input={<Input id={this.props.id} />} margin="normal">
                </TextField>
            </FormControl>
        );
    }
}

FilterSortField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterSortField);