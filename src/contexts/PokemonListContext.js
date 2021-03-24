import { gql } from "apollo-boost";
import React, { useContext, useState } from "react";
import { useQuery } from "react-apollo";
import { LS_POKEMONS, setLocalStorage } from "../utils";

const PokemonListContext = React.createContext([]);
const PokemonListFetchContext = React.createContext([]);

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        name
        image
      }
    }
  }
`;

export function usePokemonList() {
  return useContext(PokemonListContext);
}

export function usePokemonListFetch() {
  return useContext(PokemonListFetchContext);
}

export default function PokemonListContextProvider({ children }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [skipQuery, setSkipQuery] = useState(false);

  // query pokemon list from API
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    skip: skipQuery,
    variables: {
      limit: 898,
      offset: 0,
    },
  });

  if (!loading && !error && data) {
    const results = data.pokemons.results;
    setPokemonList(results);
    setLocalStorage(LS_POKEMONS, results);
    setSkipQuery(true);
  }

  return (
    <PokemonListContext.Provider value={pokemonList}>
      <PokemonListFetchContext.Provider value={[loading, error]}>
        {children}
      </PokemonListFetchContext.Provider>
    </PokemonListContext.Provider>
  );
}
