import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
