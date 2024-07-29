// AssetsCountChart.js
import React, { useEffect, useState } from 'react';
import { ICON } from '../../../../utils/icon';
import ChartComponent from '../../../../components/Chart';
import axios from 'axios';

const AlertSecurityChart = () => {
    const [loading, setLoading] = useState(false);
    // const {caseDashboardData, fetchCaseDashboardData} = useCase();
    const [chartData,setChartData] = useState({
        1:0,
        2:0,
        3:0
     })

    const severityCountData = {
        high : chartData?.["3"],
        medium: chartData?.["2"],
        low: chartData?.["1"]
    };
     
    


    function transformInventoryData(serverityCounts) {
        const labels = Object.entries(serverityCounts || {}).map(([key,value]) => `${key}: ${value}`);
        const data = Object.values(serverityCounts);

        return {
            labels: labels,
            datasets: [{
                label: 'Count',
                data: data,
            }]
        };
    }
     


    const fetchData = () => {
        axios.get("http://192.168.40.48:8080/api/alerts/severity-chart")
        .then((response) => {
            // console.log("wetrwtr",response.data)
            setChartData(response.data.severity)
        }).catch((error) => {
            console.log(error)
        })
    }
// console.log("rewrwt",matricsData)
   
useEffect(() => {
    fetchData()
},[])

    return (
        <div>
            {loading ? <span className="chart-loading">{ICON.LOADING}</span>: severityCountData && (
                <ChartComponent
                    type="doughnut"
                    data={transformInventoryData(severityCountData)}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                            }
                        }
                    }}
                    canvaId="chart-1"
                    title="Alert Severity Chart"
                    style={{maxHeigth:"300px"}}
                />
            )}
        </div>
    );
};

export default AlertSecurityChart;
