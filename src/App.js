import "./App.css";
import React from "react";
import { Route, Routes } from "react-router";
import Loader from "./components/Loader/Loader";
const Case = React.lazy(() => import("./pages/CaseModule"));

function App() {
  
  return (
    <Routes>
          <Route path="/" element={<>MAIN SOC PAGE</>}/>
          <Route path="/case" element={<React.Suspense fallback={<Loader/>}><Case /></React.Suspense>} />
    </Routes>
  )
}

export default App;
