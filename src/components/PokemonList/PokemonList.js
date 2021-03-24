import "./PokemonList.scss";
import React, { useRef, useState } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import Pokemon from "../Pokemon/Pokemon";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";
import { usePokemonList } from "../../contexts/PokemonListContext";
import { useArchive } from "../../contexts/ArchiveContext";

export default function PokemonList() {
  const [isArchive, setIsArchive] = useState(false);
  const [details, setDetails] = useState(false);
  const pokemons = usePokemonList();
  const archive = useArchive();
  const pokemon = useRef(null);

  function viewDetails(obj) {
    pokemon.current = obj;
    setDetails(true);
  }

  function closeDetails() {
    setDetails(false);
  }

  function toggleList() {
    setIsArchive(!isArchive);
  }

  if (details) {
    return (
      <Container id="pokemon-details-container">
        <PokemonDetails pokemon={pokemon.current} closeDetails={closeDetails} />
      </Container>
    );
  } else {
    const list = isArchive ? archive : pokemons;
    return (
      <>
        {isArchive && list.length === 0 && (
          <Container id="empty-message" className="mx-auto">
            <p>You do not have a pokemon yet.</p>
            <p>Try to catch one in the wild.</p>
            <p>Good luck, trainer!</p>
          </Container>
        )}
        <Container id="pokemons-container" className="mx-auto">
          {list.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} onClick={viewDetails} />
          ))}
          <Button id="toggleListButton" variant="primary" onClick={toggleList}>
            {isArchive && (
              <>
                <i className="fa fa-angle-left"></i>
                Back
              </>
            )}
            {!isArchive && (
              <>
                <i className="fa fa-archive"></i>
                Archive <Badge variant="light">{archive.length}</Badge>
              </>
            )}
          </Button>
          <ScrollToTopButton id="goToTopButton" />
        </Container>
      </>
    );
  }
}
