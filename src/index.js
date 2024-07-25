import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import { LoaderProvider } from "./context/LoaderContext";
import { CaseProvider } from "./context/CaseContext";
import { ThemeProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <BrowserRouter>
    <ThemeProvider>
      <LoaderProvider>
        <CaseProvider>
          <App />
        </CaseProvider>
      </LoaderProvider>
    </ThemeProvider>
  </BrowserRouter>
);
