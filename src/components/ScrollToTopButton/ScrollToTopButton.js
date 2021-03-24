import "./ScrollToTopButton.scss";
import React from "react";
import { Button } from "react-bootstrap";

export default function ScrollToTopButton({ id }) {
  function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  return (
    <Button id={id} variant="secondary" onClick={scrollToTop}>
      <i className="fa fa-angle-up"></i>
    </Button>
  );
}
