import "./NewPokemonForm.scss";
import "../../animation.scss";
import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { useArchive, useArchiveUpdate } from "../../contexts/ArchiveContext";
import { LS_ARCHIVE, setLocalStorage } from "../../utils";

export default function NewPokemonForm({ pokemon, onClose, onComplete }) {
  const [show, setShow] = useState(true);
  const [validated, setValidated] = useState(false);
  const [formName, setFormName] = useState("");
  const [warning, setWarning] = useState(false);
  const archive = useArchive();
  const setArchive = useArchiveUpdate();
  const formNameRef = useRef(null);

  function triggerWarning() {
    setWarning(true);
  }

  function stopWarning() {
    setWarning(false);
  }

  function handleClose() {
    setShow(false);
    onClose();
  }

  function handleChange(e) {
    setFormName(e.target.value);
    setValidated(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (formName.length >= 4 && formName.length <= 12) {
      setValidated(true);
      addToArchive(formName);
      handleClose();
      onComplete();
    } else {
      formNameRef.current.focus();
      triggerWarning();
    }
  }

  function addToArchive(nickname) {
    const newPokemon = {
      uuid: uuid(),
      nickname: nickname,
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
    };
    const newList = [...archive, newPokemon];

    // update archive context
    setArchive(newList);

    // update archive in local storage
    setLocalStorage(LS_ARCHIVE, newList);

    console.log("Saved!");
  }

  return (
    <Modal
      show={show}
      className="mx-auto"
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Gotcha!</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={warning ? "flash-red" : ""}
        onAnimationEnd={stopWarning}
      >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formPokemonName">
            <Form.Label>Give your new pokemon a name</Form.Label>
            <Form.Control
              ref={formNameRef}
              type="text"
              placeholder="Input pokemon's name"
              required
              value={formName}
              onChange={handleChange}
              isInvalid={formName.length < 4 || formName.length > 12}
            />
            <Form.Control.Feedback type="invalid">
              Pokemon's name must be 4-12 characters long.
            </Form.Control.Feedback>
          </Form.Group>
          <div id="modal__buttons">
            <Button variant="danger" onClick={handleClose}>
              Let it go...
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <p>The pokemon you catch will be moved to your inventory</p>
      </Modal.Footer>
    </Modal>
  );
}
