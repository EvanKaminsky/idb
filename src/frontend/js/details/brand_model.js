var data = require('json-loader!../../spoof/testdata_brand.json');

import React from 'react';

export default class brand_model extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            brand: ""
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(() =>
            this.tick(), 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        fetch(data).then(response => {
            return response.json()
        }).then(json => {
            console.log(json);
            this.setState({brand : json[0]})
        })
    }
  render() {
    return (
      <div class = "col-md-6 cocktail-box">
      <img class="img-responsive" src={"" + brand.image} />
      <h2>{brand.name}</h2>
      <h3>Details</h3>
      <p>{brand.details}</p>
      <h3>Countries</h3>
      <p>{brand.countries}</p>
      <h3>Ingredients</h3>
      <p>{brand.ingredients}</p>
    </div>
    );
  }
}