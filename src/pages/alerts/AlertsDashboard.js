import React from 'react'
import AlertsChartOne from './AlertsChartOne'
import AlertsChartTwo from './AlertsChartTwo'
import AlertsKanban from './AlertsKanban'
import './alerts-dashboard.css'


function AlertsDashboard() {
  return (
    <div id="alerts-dashboard-container">
        <AlertsKanban/>
        <AlertsChartOne/>
        <AlertsChartTwo/>
    </div>
  )
}

export default AlertsDashboard