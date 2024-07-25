// AssetsCountChart.js
import React, { useEffect, useState } from 'react';
import ChartComponent from '../Chart';
import { ICON } from '../../utils/icon';

const AssestStatusCountChart = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const roles = ["Agent Installed", "vulnerable", "Verified"];

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
                        backgroundColor: ['blue', 'red', 'orange'],
                        data: [82, 140, 500], // Example data
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
                    maxWidth="400px"
                    maxHeight="400px"
                />
            )}
        </div>
    );
};

export default AssestStatusCountChart;
