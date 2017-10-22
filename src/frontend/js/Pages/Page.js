import React from 'react';


export default class Page extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to {this.props.title}</h1>
            </div>
        )
    }
}


