import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "normalize.css";
import "antd/dist/antd.css";
import store from "./store";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
