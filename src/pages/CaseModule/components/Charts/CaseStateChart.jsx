// AssetsCountChart.js
import React, { useEffect, useState } from 'react';
import ChartComponent from '../../../../components/Chart';
import { ICON } from '../../../../utils/icon';
import { useCase } from '../../../../context/CaseContext';

const CaseStateChart = () => {
    const [loading, setLoading] = useState(false);
    // const {caseDashboardData, fetchCaseDashboardData} = useCase();
    const caseDashboardData = [
        {
            date:"01-04-2024",
            count:10
        },
        {
            date:"05-04-2024",
            count:50
        },
        {
            date:"08-04-2024",
            count:20
        },
        {
            date:"13-04-2024",
            count:30
        }
    ];



    function transformInventoryData(caseCounts) {
        const labels = caseCounts.map((item)=>item.date);
        const data = caseCounts.map((item)=>item.count);

        return {
            labels: labels,
            datasets: [{
                label: 'Count',
                data: data,
                fill:true,
            }]
        };
    }

    // useEffect(() => {
    //     (async () => {
    //         await fetchCaseDashboardData();
    //         setLoading(false);
    //     })();
    // }, []);

    // console.log("=========", caseDashboardData);

    return (
        <div>
            {loading ? <span className="chart-loading">{ICON.LOADING}</span>: caseDashboardData && (
                <ChartComponent
                    type="line"
                    data={transformInventoryData(caseDashboardData)}
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
                    title="Case State Chart"
                    style={{maxHeigth:"300px"}}
                />
            )}
        </div>
    );
};

export default CaseStateChart;
