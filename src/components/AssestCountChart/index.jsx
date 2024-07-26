// AssetsCountChart.js
import React, { useEffect, useState } from 'react';
import ChartComponent from '../Chart';
import { ICON } from '../../utils/icon';

const AssetsCountChart = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const roles = ["Software", "Web Application", "Desktop", "Laptop"];

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
                datasets: [{
                    label: 'Assets Counts',
                    // backgroundColor: ['blue', 'red', 'orange', 'green', 'purple'],
                    data: [82, 140, 350, 100],
                }]
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
                    type="doughnut"
                    data={data}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                // text: 'Assets Count by Support Role'
                            }
                        }
                    }}
                    canvaId="chart-1"
                    title="Assets Count"
                    style={{maxHeigth:"300px"}}
                />
            )}
        </div>
    );
};

export default AssetsCountChart;
