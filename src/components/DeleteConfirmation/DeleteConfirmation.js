import "./DeleteConfirmation.scss";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { LS_ARCHIVE, setLocalStorage } from "../../utils";
import { useArchive, useArchiveUpdate } from "../../contexts/ArchiveContext";

export default function DeleteModal({ pokemon, onClose, onComplete }) {
  const [show, setShow] = useState(true);
  const archive = useArchive();
  const setArchive = useArchiveUpdate();

  function handleClose() {
    setShow(false);
    onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    deleteFromArchive();
    handleClose();
    onComplete();
  }

  function deleteFromArchive() {
    const newList = archive.filter((p) => p.uuid !== pokemon.uuid);

    // update archive context
    setArchive(newList);

    // update archive in local storage
    setLocalStorage(LS_ARCHIVE, newList);

    console.log("Deleted!");
  }

  return (
    <Modal
      className="mx-auto my-auto"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Warning!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this pokemon from the archive?</p>
        <p style={{ color: "red" }}>IMPORTANT: You can not undo this action.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
