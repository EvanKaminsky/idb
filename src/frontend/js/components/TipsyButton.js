import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

function TipsyButton(props) {
    const { classes } = props;

    return (
        <div>
            <Button raised className={classes.button} onClick={props.onClick}>
                Search
            </Button>
        </div>
    );
}

TipsyButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TipsyButton);