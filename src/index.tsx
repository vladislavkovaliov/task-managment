import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Transport } from './transport';
import createGlobalStores from './stores/utils/createGlobalStores';

export function initialize() {
  const transport = new Transport();

  const stores = createGlobalStores(transport);
  // const services = createGlobalServices();

  return {
    stores: stores,
    services: {},
  };
}

export function renderApp() {
  const { stores, services } = initialize();

  return (
    <Provider stores={stores} services={services}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );
}

ReactDOM.render(renderApp(), document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
