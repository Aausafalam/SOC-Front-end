import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import AssetsManagementModule from "./pages/AssetsManagementModule";
import Layout from "./layout";
import VulnerabilitiesModule from "./pages/VulnerabilitiesModule";
import Alert from "./pages/Alert";
import Main from "./pages/Dashboard/Main";
const Case = React.lazy(() => import("./pages/CaseModule"));

function App() {
  
  return (
    <Layout>
      <Routes>
          <Route path="/" element={<AssetsManagementModule/>}/>
          <Route path="/case" element={<React.Suspense fallback={<Loader/>}><Case /></React.Suspense>} />
          <Route path="/assetsmanagement" element={<React.Suspense fallback={<Loader/>}><AssetsManagementModule /></React.Suspense>} />
          <Route path="/vulnerability" element={<React.Suspense fallback={<Loader/>}><VulnerabilitiesModule /></React.Suspense>} />
          <Route path="/alerts" element={<React.Suspense fallback={<Loader/>}><Alert /></React.Suspense>} />
          <Route path="/histogram" element={<React.Suspense fallback={<Loader/>}><Main /></React.Suspense>} />
          
    </Routes>
    </Layout>
    
  )
}

export default App;
