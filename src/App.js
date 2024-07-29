import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import AssetsManagementModule from "./pages/AssetsManagementModule";
import Layout from "./layout";
import Compliance from "./pages/Compliance/Complieance";
import VulnerabilitiesModule from "./pages/VulnerabilitiesModule";
import Alert from "./pages/Alert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VulnerabilityAnalyticsPage from "./pages/VulnerabilitiesModule/VulnerabilityAnalytics";
import Configuration from "./pages/Configuration";
const Case = React.lazy(() => import("./pages/CaseModule"));


function App() {
  
  return (
    <Layout>
      <Routes>
          <Route path="/" element={<AssetsManagementModule/>}/>
          <Route path="/case" element={<React.Suspense fallback={<Loader/>}><Case /></React.Suspense>} />
          <Route path="/assetsmanagement" element={<React.Suspense fallback={<Loader/>}><AssetsManagementModule /></React.Suspense>} />
          <Route path="/compliance" element={<React.Suspense fallback={<Loader/>}><Compliance/></React.Suspense>} />
          <Route path="/vulnerability" element={<React.Suspense fallback={<Loader/>}><VulnerabilitiesModule /></React.Suspense>} />
          <Route path="/vulnerability/analytics" element={<React.Suspense fallback={<Loader/>}><VulnerabilityAnalyticsPage /></React.Suspense>} />
          <Route path="/alerts" element={<React.Suspense fallback={<Loader/>}><Alert /></React.Suspense>} />
          <Route path="/configuration" element={<React.Suspense fallback={<Loader/>}><Configuration /></React.Suspense>} />
    </Routes>
    <ToastContainer />
    </Layout>
    
  )
}
// Configuration

export default App;
