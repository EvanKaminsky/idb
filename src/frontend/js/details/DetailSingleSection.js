import React from 'react';
import Typography from 'material-ui/Typography';

export default class DetailSingleSection extends React.Component {

    render() {
        if (this.props.title === null || this.props.label === null) {
            return null;
        }

        return (
            <div>
                <Typography type="headline" component="h3">{this.props.title}</Typography>
                <Typography component="p">{this.props.label}</Typography>
            </div>
        )
    }

}
