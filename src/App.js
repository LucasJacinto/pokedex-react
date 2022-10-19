import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Pokedex from "./components/Pokedex";

import { getPokemonData, getPokemons, searchPokemon } from "./api";

import { FavoritesProvider } from "./contexts/favoritesContext";

import "./App.css";

const favoritesKey = "f";

function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const itensPerPage = 25;

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const data = await getPokemons(itensPerPage, itensPerPage * page);

      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });

      const results = await Promise.all(promises);

      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage));
    } catch (error) {
      console.log("fetchPokemons error: ", error);
    }
  };

  const loadFavoritesPokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(favoritesKey)) || [];
    setFavorites(pokemons);
  };

  useEffect(() => {
    loadFavoritesPokemons();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const updateFavoritesPokemons = (name) => {
    const updatedFavorites = [...favorites];
    const favoritesIndex = favorites.indexOf(name);

    if (favoritesIndex >= 0) {
      updatedFavorites.slice(favoritesIndex, 1);
    } else {
      updatedFavorites.push(name);
    }

    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }

    setLoading(true);
    setNotFound(false);

    const result = await searchPokemon(pokemon);

    if (!result) {
      setNotFound(true);
    } else {
      setPokemons([result]);
      setPage(0);
      setTotalPages(1);
    }
    setLoading(false);
  };

  return (
    <FavoritesProvider
      value={{
        favoritesPokemons: favorites,
        updateFavoritesPokemons: updateFavoritesPokemons,
      }}
    >
      <div>
        <Navbar />
        <Searchbar onSearch={onSearchHandler} />
        {notFound ? (
          <div className="not-found-text">Pokémon não encontrado!</div>
        ) : (
          <Pokedex
            pokemons={pokemons}
            loading={loading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </FavoritesProvider>
  );
}

export default App;
