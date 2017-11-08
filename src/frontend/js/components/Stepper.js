import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing.unit * 4,
        marginBottom: 20,
        background: theme.palette.background.default,
    },
});

class Stepper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            pageCount: props.pages,
            currentPage: props.currentPage,
            next: props.next,
            back: props.back
        };
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    handleNext (event){
        this.setState({
            activeStep: this.state.activeStep + 1,
        });
    };

    handleBack (event) {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    };

    render() {
        const { classes, theme } = this.props;
        const pageCount = this.props.pages;
        const currentPage = this.props.currentPage;
        const next = this.props.next;
        const back = this.props.back;

        return (
            <div className={classes.root}>
                <Paper square elevation={0} className={classes.header}>
                    <Typography>Page {currentPage} of {pageCount}</Typography>
                </Paper>
                <MobileStepper
                    type="text"
                    steps={pageCount}
                    position="static"
                    activeStep={this.state.activeStep}
                    className={classes.mobileStepper}
                    nextButton={
                        <Button dense onClick={next} disabled={currentPage >= pageCount}>
                            Next
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button dense onClick={back} disabled={currentPage === 1}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                        </Button>
                    }
                />
            </div>
        );
    }
}

Stepper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Stepper);