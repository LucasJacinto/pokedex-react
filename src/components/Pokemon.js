import React, { useContext, useLayoutEffect, useRef } from "react";
import FavoritesContext from "../contexts/favoritesContext";

const Pokemon = (props) => {
  const { favoritesPokemons, updateFavoritesPokemons } =
    useContext(FavoritesContext);
  const { pokemon } = props;
  const heart = favoritesPokemons.includes(pokemon.name) ? "❤️" : "💙";
  
  const containerRef = useRef();

  const onHeartClick = () => {
    updateFavoritesPokemons(pokemon.name);
  };

  useLayoutEffect(() => {
    {pokemon.types.map((type, index) => {
      containerRef.current.classList.add(type.type.name);
    })}
  })

  return (
    <div ref={containerRef} className="pokemon-card">
      <div className="pokemon-image-container">
        <img
          alt={pokemon.name}
          src={pokemon.sprites.front_default}
          className="pokemon-image"
        />
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3>{pokemon.name}</h3>
          <div>#{pokemon.id}</div>
        </div>
        <div className="card-bottom">
          <div className="pokemon-type">
            {pokemon.types.map((type, index) => {
              return (
                <div key={index} className="pokemon-type-text">
                  {type.type.name}
                </div>
              );
            })}
          </div>
          <button className="pokemon-heart-btn" onClick={onHeartClick}>
            {heart}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
