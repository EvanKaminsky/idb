import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { HTMLText } from "../constants.js";

const styles = {
    card: {
        width: 340,
        minHeight: 360,
        maxHeight: 500
    },
    media: {
        height: 200,
    },
};

function AbstractCard(props) {
    const { classes } = props;

    return (
        <div>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={props.imageurl} title={props.name}/>

                <CardContent>
                    <Typography type="title">{props.name}</Typography>
                    <HTMLText>{props.body}</HTMLText>
                </CardContent>

                <CardActions>
                    <Button dense color="primary" onClick={props.onClick}>More</Button>
                </CardActions>
            </Card>
        </div>
    );
}

AbstractCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AbstractCard);

