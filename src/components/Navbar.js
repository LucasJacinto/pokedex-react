import React, { useContext } from "react";
import FavoritesContext from "../contexts/favoritesContext";

const Navbar = () => {
  const {favoritesPokemons} = useContext(FavoritesContext);

  const logoImg =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
  return (
    <nav>
      <div>
        <img alt="pokeapi-logo" src={logoImg} className="navbar-img" />
      </div>
      <div>{favoritesPokemons.length} ❤️</div>
    </nav>
  );
};

export default Navbar;
