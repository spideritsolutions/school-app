import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import { Store } from "@reduxjs/toolkit";

import { BrowserRouter } from "react-router-dom";

import "./assets/styles/index.css";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
