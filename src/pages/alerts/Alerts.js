import React, { useState } from 'react';
import AlertsTable from './AlertsTable';
import AlertSingleView from './AlertSingleView';
import AlertsDashboard from './AlertsDashboard';
import './base.css';
import './alerts-style.css';

function Alerts() {
  const [alertID, setAlertID] = useState(null);
//console.log(alertID)
  // const alertFunc = (alert_id)=>{
  //   setAlertID(alert_id)
  // }

  return (
    <div id="alerts-main-container">
      <AlertsDashboard/>
      <div id="alerts-content-container">
        <AlertsTable setAlertID={setAlertID} />
        <AlertSingleView alertID={alertID} />
      </div>
    </div>
  );
}

export default Alerts;
