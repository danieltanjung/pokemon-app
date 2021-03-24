import "./StartScreen.scss";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function StartScreen({ startApp }) {
  return (
    <Container fluid id="start-screen">
      <h1 id="title">PoKéMoN</h1>
      <h2 id="subtitle">Catch & Collect Them All!</h2>
      <Button id="play-button" onClick={startApp}>
        Play Now <i className="fa fa-play"></i>
      </Button>
    </Container>
  );
}
