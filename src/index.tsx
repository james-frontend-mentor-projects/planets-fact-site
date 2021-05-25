import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PlanetsProvider } from "./contexts/planetsContext";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./styles/index.scss";

ReactDOM.render(
  <React.StrictMode>
    <PlanetsProvider>
      <App />
    </PlanetsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
