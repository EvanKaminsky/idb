class country_model extends React.Component {
  render() {
    return (
      <div class = "col-md-6 cocktail-box">
      <img class="img-responsive" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/840px-Flag_of_Mexico.svg.png"/>
      <h2>{this.props.name}</h2>
      <h3>Ingredients</h3>
      <p><a href="../ingredients/tequila.html">Tequila</a>, <a href="../ingredients/kahlua.html">Kahlua</a></p>
      <h3>Brands</h3>
      <p><a href="../brands/olmeca.html">Olmeca</a></p>
      </div>
    );
  }
}