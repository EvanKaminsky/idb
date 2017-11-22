import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
});

class TipsyGrid extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
            <Grid container style={{margin: 0, width: '100%',}} className={classes.root}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={16}>
                        {this.props.elements}
                    </Grid>
                </Grid>
            </Grid>
            </form>
        );
    }
}

TipsyGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TipsyGrid);