import React from 'react';

const imageUrl = require(`../../static/backgrounds/404.png`);

export default class NotFoundPage extends React.Component {
    render() {
        return <div style={{ backgroundImage: `url(${imageUrl})` }} />
    }
}
