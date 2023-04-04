import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserStore from "./store/UserStore";
import LayersStore from "./store/LayersStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        layers: new LayersStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
