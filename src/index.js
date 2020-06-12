import React from "react";
import ReactDOM from "react-dom";
// import ProductList from "./components/product/ProductList";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import Router from "./router/router";
import "./styles/custom.scss";


const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  rootElement
);
