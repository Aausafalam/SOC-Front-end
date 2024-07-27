import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import { LoaderProvider } from "./context/LoaderContext";
import { CaseProvider } from "./context/CaseContext";
import { AssetsProvider } from "./context/AssetsContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ComplianceProvider } from "./context/ComplianceContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <BrowserRouter>
    <ThemeProvider>
      <LoaderProvider>
        <CaseProvider>
        <AssetsProvider>
          <ComplianceProvider>
          <App />
          </ComplianceProvider>
          </AssetsProvider>
        </CaseProvider>
      </LoaderProvider>
    </ThemeProvider>
  </BrowserRouter>
);
