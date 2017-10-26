class cocktail_model extends React.Component {
  render() {
    return (
      <div class = "col-md-6 cocktail-box">
      <img class="img-responsive" src="http://www.1001cocktails.com/images/blue-lagoon-50.jpg"/>
      <h2>{this.cocktails.name}</h2>
      <h3>Ingredients</h3>
      <ul>
        <li>1 oz <a href="../ingredients/vodka.html">vodka</a></li>
        <li>1 oz blue curacao liqueur</li>
        <li>1 oz lemonade</li>
        <li>1 cherry</li>
      </ul>
      <h3>Recipe</h3>
      <p>{this.cocktails.recipe}</p>
      <h3>Brands</h3>
      <p><a href="../brands/blackwoods.html">Blackwoods</a></p>
    </div>
    );
  }
}