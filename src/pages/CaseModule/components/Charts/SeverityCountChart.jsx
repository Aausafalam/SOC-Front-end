// AssetsCountChart.js
import React, { useEffect, useState } from 'react';
import ChartComponent from '../../../../components/Chart';
import { ICON } from '../../../../utils/icon';
import { useCase } from '../../../../context/CaseContext';

const SeverityCountChart = () => {
    const [loading, setLoading] = useState(false);
    const {caseServerityChartData, fetchCaseSevertityChartData} = useCase();
    // const caseDashboardData = [
    //     {
    //         name:"severity1",
    //         count:10
    //     },
    //     {
    //         name:"severity2",
    //         count:50
    //     },
    //     {
    //         name:"severity3",
    //         count:15
    //     }
    // ];



    function transformInventoryData(caseCounts) {
        const labels = caseCounts.map((item)=>item.name);
        const data = caseCounts.map((item)=>item.count);

        return {
            labels: labels,
            datasets: [{
                label: 'Count',
                data: data,
            }]
        };
    }

    useEffect(() => {
        (async () => {
            await fetchCaseSevertityChartData();
            setLoading(false);
        })();
    }, []);

    return (
        <div>
            {loading ? <span className="chart-loading">{ICON.LOADING}</span>: caseServerityChartData && (
                <ChartComponent
                    type="doughnut"
                    data={transformInventoryData(caseServerityChartData)}
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
                    title="Severity Chart"
                    style={{maxHeigth:"300px"}}
                />
            )}
        </div>
    );
};

export default SeverityCountChart;
