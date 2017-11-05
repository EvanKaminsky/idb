import React from 'react';

class cocktail_model extends React.Component {
  render() {
    return (
      <div class = "col-md-6 cocktail-box">
      <img class="img-responsive" src="{this.cocktails.image}"/>
      <h2>{this.cocktails.name}</h2>
      <h3>Ingredients</h3>
      <ul>
        {this.props.cocktails.ingredients}
      </ul>
      <h3>Recipe</h3>
      <p>{this.cocktails.recipe}</p>
      <h3>Brands</h3>
      <p>{this.cocktails.brands}</p>
    </div>
    );
  }
}