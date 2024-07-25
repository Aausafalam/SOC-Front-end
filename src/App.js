import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import AssetsManagementModule from "./pages/AssetsManagementModule";
import Layout from "./layout";
const Case = React.lazy(() => import("./pages/CaseModule"));

function App() {
  
  return (
    <Layout>
      <Routes>
          <Route path="/" element={<AssetsManagementModule/>}/>
          <Route path="/case" element={<React.Suspense fallback={<Loader/>}><Case /></React.Suspense>} />
          <Route path="/assetsmanagement" element={<React.Suspense fallback={<Loader/>}><AssetsManagementModule /></React.Suspense>} />
    </Routes>
    </Layout>
    
  )
}

export default App;
