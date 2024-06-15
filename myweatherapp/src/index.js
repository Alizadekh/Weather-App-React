import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CityProvider } from "./Context/CityContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CityProvider>
      <App />
    </CityProvider>
  </React.StrictMode>
);
