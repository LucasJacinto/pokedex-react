import React from "react";

const FavoritesContext = React.createContext({
  favoritesPokemons: [],
  updateFavoritesPokemons: (id) => null,
});

export const FavoritesProvider = FavoritesContext.Provider;

export default FavoritesContext;
