import React from 'react';
import Typography from 'material-ui/Typography';

export default class DetailSingleSection extends React.Component {

    render() {
        if (this.props.title === null || this.props.label === null
            || this.props.label.length < 1 || this.props.label === "NULL") {
            return null;
        }

        return (
            <div>
                <Typography type="display1" align="left">{this.props.title}</Typography>
                <Typography type="headline" align="left" component="p">{this.props.label}</Typography>
            </div>
        )
    }

}
