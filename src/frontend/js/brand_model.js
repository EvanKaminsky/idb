class brand_model extends React.Component {
  render() {
    return (
      <div class = "col-md-6 cocktail-box">
      <img class="img-responsive" src="{this.brands.image}" />
      <h2>{this.brands.name}</h2>
      <h3>Details</h3>
      <p>{this.brands.details}</p>
      <h3>Countries</h3>
      <p>{this.brands.countries}</p>
      <h3>Ingredients</h3>
      <p>{this.brands.ingredients}</p>
    </div>
    );
  }
}