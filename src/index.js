import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { LoaderProvider } from "./context/LoaderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <BrowserRouter>
    <LoaderProvider>
      <App />
    </LoaderProvider>
  </BrowserRouter>
);
