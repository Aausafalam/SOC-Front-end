import React, { useState, useEffect } from 'react';
import TableComponent from '../../components/Table/Table';

function getTableData(data, setAlertID) {
  //console.log(data);

  return {
    title: "Alerts Table",
    rows: data[0].map((item) => ({
      Id: { key: 'id', value: item.id },
      signature: { key: 'title', value: item.signature },
      Category: { key: 'category', value: item.category },
      State: { key: 'price', value: item.alertStateName },
      'Assignee': { key: 'rating', value: item.assignedTo.name },
      // 'Present (0-4 Hours)': { key: 'stock', value: item.stock },
      // 'Present (4-9 Hours)': { key: 'brand', value: item.brand }
    })),
    searchBar: true,
    searchUrl: "/alert?searchText=inputText",
    export: true,
    exportDataUrl: `${process.env.REACT_APP_API_BASE_URL}/getmonthlyattendancesummary/export`,
    pagination: true,
    reset: true,
    paginationUrl: "http://192.168.42.39:3000/alert?page=input&limit=count",
    autoSuggestionUrl: "/getautosuggestion/Users?searchText=inputText&fields=employeename,email,employeeId",
    initialSuggestions: false,
    totalPage: Math.ceil(data[1].totalRecords / data[1].limit),
    totalItemCount: data[1].totalRecords,
    filterTimeLine: true,
    action:true,
    actionData:[
      {
        label:"view",
        name:"view",
        functions:(id) => {
          //console.log(id);
          setAlertID(id);
        }
      }
    ],
    getTableData
  };
}

function AlertsTable({ setAlertID }) {
  const [tableData, setTableData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://192.168.42.39:3000/api/alerts';
      try {
        const response = await fetch(url, {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        const transformedData = getTableData(jsonData, setAlertID);
        
        setTableData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [setAlertID]);

  return (
    <div id='alerts-table-container'>
      <TableComponent loading={loading} tableData={tableData} />
    </div>
  );
}

export default AlertsTable;
