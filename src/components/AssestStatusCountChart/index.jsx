// AssetsCountChart.js
import React, { useEffect, useState } from 'react';
import ChartComponent from '../Chart';
import { ICON } from '../../utils/icon';

const AssestStatusCountChart = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const roles = [
        "Agent Installed",
        "Vulnerable",
        "Verified",
        "Expired",
        // "Public Facing Web Application",
        "Unverified",
        // "Needs Attention",
        "High Risk",
        // "Low Risk",
        // "Pending Verification"
    ];

    const fetchDataInitially = async (url, token) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Fetch data failed, using example data', error);
            // Use example data if fetch fails
            return {
                labels: roles,
                datasets: [
                    {
                        label: 'Assets Status',
                        // backgroundColor: ['blue', 'red', 'orange'],
                        data: [82, 140, 500,400,200,150,600,240], // Example data
                    }
                ],
            };
        }
    };

    useEffect(() => {
        (async () => {
            const initialData = await fetchDataInitially("http://172.29.26.147:3001/inventory/dashboard", "your-token-here");
            setData(initialData);
            setLoading(false);
        })();
    }, []);

    return (
        <div>
            {loading ? <span className="chart-loading">{ICON.LOADING}</span>:data && (
                <ChartComponent
                    type="bar"
                    data={data}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                // text: 'Assets Status Over Time'
                            }
                        },
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Status'
                                },
                                barPercentage: 0.1,  // Adjust this value to reduce the bar width
                                categoryPercentage: 0.5  // Adjust this value to reduce the category width
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Count'
                                }
                            }
                        }
                    }}
                    canvaId="chart-2"
                    title="Critical Assets Count"
                   style={{maxHeigth:"340px"}}
                />
            )}
        </div>
    );
};

export default AssestStatusCountChart;
