import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap', backgroundColor: 'red',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});


class TipsySearchField extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                  id="search"
                  label="Search field"
                  type="search"
                  className={classes.textField}
                  margin="normal"
              />
            </form>
        );
    }
}

TipsySearchField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TipsySearchField);