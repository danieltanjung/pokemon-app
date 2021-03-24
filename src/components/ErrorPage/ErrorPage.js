import "./ErrorPage.scss";
import React from "react";
import { Container } from "react-bootstrap";

export default function ErrorPage({ error }) {
  return (
    <Container fluid id="error-container">
      <h1>Error!</h1>
      <p>Something's wrong...</p>
      <code>{error}</code>
    </Container>
  );
}
