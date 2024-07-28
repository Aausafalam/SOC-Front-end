import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoaderProvider } from "./context/LoaderContext";
import { CaseProvider } from "./context/CaseContext";
import { AssetsProvider } from "./context/AssetsContext";
import { ThemeProvider } from "./context/ThemeContext";
import { VulnerabilityProvider } from "./context/VulnerabilityContext";
import { AlertProvider } from "./context/AlertContext";
import { UserProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider>
        <LoaderProvider>
          <UserProvider>
            <CaseProvider>
              <AssetsProvider>
                <VulnerabilityProvider>
              <AlertProvider>
              <App />
              </AlertProvider>
                </VulnerabilityProvider>
              </AssetsProvider>
            </CaseProvider>
          </UserProvider>
        </LoaderProvider>
    </ThemeProvider>
  </BrowserRouter>
);
