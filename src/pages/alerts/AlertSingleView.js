import React, { useState, useEffect } from 'react';

const fetchData = async (id) => {
  const url = `http://192.168.42.39:3000/expandAlert/${id}`;
  
  const response = await fetch(url, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const jsonData = await response.json();
  return jsonData;
};

function AlertSingleView({ alertID }) {
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    const fetchAlertData = async () => {
      try {
        const data = await fetchData(alertID);
        setAlertData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (alertID) {
      fetchAlertData();
    }
  }, [alertID]);

  if (!alertData) {
    return <div id="alert-single-view-container">Loading...</div>;
  }
//console.log(alertID)
  return (
    <div id="alert-single-view-container">
      <div id="alert-items-container"><p>Key</p><p>Values</p></div>
      {Object.entries(alertData?.data?.alertDetails || {}).map(([key, value]) => (
        <div key={key} id="alert-items-container">
          <p>{key}</p>
          {
            typeof value === "object" ? 
            <p>{value?.name}</p> : <p>{value}</p>
            }
        </div>
      ))}
      <div id="alert-items-container"><p></p><p>View More...</p></div>
    </div>
  );
}

export default AlertSingleView;
