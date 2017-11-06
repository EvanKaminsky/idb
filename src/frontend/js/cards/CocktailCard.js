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

function CocktailCard(props) {
    const { classes } = props;

    return (
        <div>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={props.cocktail.imageurl} title={props.cocktail.name}/>

                <CardContent>
                    <Typography type="headline" component="h2">{props.cocktail.name}</Typography>
                    <Typography component="p">{props.cocktail.description}</Typography>
                </CardContent>

                <CardActions>
                    <Button dense color="primary" onClick={props.onClick}>More</Button>
                </CardActions>
            </Card>
        </div>
    );
}

CocktailCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CocktailCard);
