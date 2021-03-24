import "./PokemonDetails.scss";
import "../../animation.scss";
import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import {
  Button,
  Card,
  CardImg,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { capitalize, catchSuccessfully } from "../../utils";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import NewPokemonForm from "../NewPokemonForm/NewPokemonForm";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import ErrorPage from "../ErrorPage/ErrorPage";

const GET_POKEMON_DETAILS = gql`
  query pokemon($species: String!) {
    pokemon(name: $species) {
      id
      name
      weight
      height
      types {
        type {
          name
        }
      }
      stats {
        base_stat
        effort
        stat {
          name
        }
      }
      abilities {
        ability {
          name
        }
      }
    }
  }
`;

export default function PokemonDetails({ pokemon, closeDetails }) {
  const [tried, setTried] = useState(false);
  const [successDialogue, setSuccessDialogue] = useState(false);
  const [deleteDialogue, setDeleteDialogue] = useState(false);
  const [warning, setWarning] = useState(false);
  const isMine = pokemon.hasOwnProperty("nickname");

  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { species: pokemon.name },
  });

  function triggerWarning() {
    setWarning(true);
  }

  function stopWarning() {
    setWarning(false);
  }

  function catchPokemon() {
    setTried(true);

    if (catchSuccessfully()) {
      setSuccessDialogue(true);
      setTried(false);
    } else {
      setSuccessDialogue(false);
      triggerWarning();
    }
  }

  function deletePokemon() {
    setDeleteDialogue(true);
  }

  if (loading) {
    return <LoadingOverlay animation="grow" variant="light" />;
  } else if (error) {
    return <ErrorPage error={error} />;
  } else {
    const info = data.pokemon;

    return (
      <Card
        id="pokemon"
        className={warning ? "flash-red" : ""}
        onAnimationEnd={stopWarning}
      >
        <CardImg
          id="pokemon__image"
          src={pokemon.image}
          alt={info.name + "'s image"}
        />
        {isMine && (
          <Card.Title id="pokemon__nickname" className="mx-auto">
            {pokemon.nickname}
          </Card.Title>
        )}
        <Button id="close-button" variant="link" onClick={closeDetails}>
          <i className="fa fa-times"></i>
        </Button>
        <Card id="pokemon__info">
          <Card.Title id="pokemon__info__name">
            {capitalize(info.name)}
          </Card.Title>
          <Row key="pokemon-types">
            <Col md={4} xs={12} className="info-name">
              Type(s)
            </Col>
            <Col className="info-value">
              {info.types.map((t) => (
                <span key={t.type.name} className="pokemon-type">
                  {capitalize(t.type.name)}
                </span>
              ))}
            </Col>
          </Row>
          <Row key="pokemon-weight">
            <Col md={4} xs={12} className="info-name">
              Weight
            </Col>
            <Col className="info-value">{info.weight}</Col>
          </Row>
          <Row key="pokemon-height">
            <Col md={4} xs={12} className="info-name">
              Height
            </Col>
            <Col className="info-value">{info.height}</Col>
          </Row>
        </Card>
        <Card.Body id="pokemon__details">
          <Card.Subtitle className="subtitle">Stats</Card.Subtitle>
          {info.stats.map((s) => (
            <Row key={s.stat.name}>
              <Col md={8} xs={6} className="stat-names">
                {capitalize(s.stat.name)}
              </Col>
              <Col className="stat-values">{s.base_stat}</Col>
            </Row>
          ))}
          <Card.Subtitle className="subtitle">Abilities</Card.Subtitle>
          <ListGroup>
            {info.abilities.map((a) => (
              <ListGroupItem key={a.ability.name}>
                {capitalize(a.ability.name)}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Card.Body>
        <div id="footer">
          {!isMine && tried && !successDialogue && (
            <div id="catch-label">
              <p>Failed to catch the pokemon.</p>
              <p> Try again?</p>
            </div>
          )}
          {!isMine && (
            <Button id="catch-button" variant="primary" onClick={catchPokemon}>
              <Image
                id="catch-button__image"
                src="favicon.ico"
                alt={"Catch " + info.name + "!"}
              ></Image>{" "}
              <strong>Catch It!</strong>
            </Button>
          )}
          {isMine && (
            <Button id="delete-button" variant="danger" onClick={deletePokemon}>
              Delete Pokemon
            </Button>
          )}
        </div>

        {successDialogue && (
          <NewPokemonForm
            pokemon={pokemon}
            onClose={() => setSuccessDialogue(false)}
            onComplete={closeDetails}
          />
        )}
        {deleteDialogue && (
          <DeleteConfirmation
            pokemon={pokemon}
            onClose={() => setDeleteDialogue(false)}
            onComplete={closeDetails}
          />
        )}
      </Card>
    );
  }
}
