import "./Pokemon.scss";
import React from "react";
import { Card, CardImg } from "react-bootstrap";
import { capitalize } from "../../utils";

export default function Pokemon({ pokemon, onClick }) {
  const displayName = pokemon.hasOwnProperty("nickname")
    ? pokemon.nickname
    : pokemon.name;
  return (
    <Card className="pokemon-card" onClick={() => onClick(pokemon)}>
      <CardImg
        className="pokemon-card__image"
        variant="top"
        src={pokemon.image}
        alt={displayName + "'s image"}
        loading="lazy"
      />
      <Card.Body>
        <Card.Title className="pokemon-card__name">
          {capitalize(displayName)}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
