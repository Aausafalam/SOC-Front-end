// AssetsCountChart.js
import React, { useEffect, useState } from 'react';
import { ICON } from '../../../../utils/icon';
import ChartComponent from '../../../../components/Chart';

const AlertSecurityChart = () => {
    const [loading, setLoading] = useState(false);
    // const {caseDashboardData, fetchCaseDashboardData} = useCase();
    const severityCountData = {
        high : 30,
        medium: 40,
        low: 20
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

    // useEffect(() => {
    //     (async () => {
    //         await fetchCaseDashboardData();
    //         setLoading(false);
    //     })();
    // }, []);

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
                    title="Alert Security Chart"
                    style={{maxHeigth:"300px"}}
                />
            )}
        </div>
    );
};

export default AlertSecurityChart;
