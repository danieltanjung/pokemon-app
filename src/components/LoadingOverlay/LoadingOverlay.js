import "./LoadingOverlay.scss";
import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingOverlay({
  animation = "border",
  variant = "light",
}) {
  return (
    <div id="loading-container">
      <Spinner
        className="spinner"
        // @ts-ignore
        animation={animation === "border" || "grow" ? animation : "border"}
        variant={
          variant === "primary" ||
          "secondary" ||
          "success" ||
          "danger" ||
          "warning" ||
          "info" ||
          "light" ||
          "dark"
            ? variant
            : "light"
        }
      ></Spinner>
      <span>Loading</span>
    </div>
  );
}
