import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Index from "./routes/Index";
import { Provider } from "react-redux";
import store from "./store";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
