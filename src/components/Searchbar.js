import React, { useState } from "react";

import { searchPokemon } from "../api";

const Searchbar = (props) => {
  const [search, setSearch] = useState("");
  const { onSearch } = props;

  const onChangeHandler = (e) => {
    setSearch(e.target.value);

    if (e.target.value === "") {
      onSearch(undefined);
    }
  };

  const onButtonClickHandler = () => {
    onSearch(search);
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input
          placeholder="Buscar pokémon"
          onChange={onChangeHandler}
          value={search}
        />
      </div>
      <div className="searchbar-btn">
        <button onClick={onButtonClickHandler}>Buscar</button>
      </div>
    </div>
  );
};

export default Searchbar;
