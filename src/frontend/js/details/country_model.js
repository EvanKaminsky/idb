class country_model extends React.Component {
  render() {
    return (
      <div class = "col-md-6 cocktail-box">
      <img class="img-responsive" src="{this.countries.flagsrc}"/>
      <h2>{this.props.name}</h2>
      <h3>Ingredients</h3>
      <p>{this.countries.ingredients}</p>
      <h3>Brands</h3>
      <p>{this.countries.brands}</p>
      </div>
    );
  }
}