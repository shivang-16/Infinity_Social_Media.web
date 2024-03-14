import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import "./index.css"
import { BrowserRouter } from "react-router-dom";

export const server = `${import.meta.env.VITE_INFINITY_API}/api/v1`;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
