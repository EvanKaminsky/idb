import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
};

function BrandCard(props) {
    const { classes } = props;

    return (
        <div>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={props.brand.imageurl} title={props.brand.name}/>

                <CardContent>
                    <Typography type="headline" component="h2">{props.brand.name}</Typography>
                    <Typography component="p">{props.brand.summary}</Typography>
                </CardContent>

                <CardActions>
                    <Button dense color="primary" onClick={props.onClick}>More</Button>
                </CardActions>
            </Card>
        </div>
    );
}

BrandCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BrandCard);

