import React, { useRef, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import styles from "./index.module.css"

// Register the required components
Chart.register(...registerables);

const ChartComponent = ({ type, data, options, canvaId, apiUrl, title, labels, getDatasets }) => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);
    const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme'));

    const fetchData = async (url, startDate, endDate) => {
        const response = await fetch(`${url}?startDate=${startDate}&endDate=${endDate}`);
        const result = await response.json();
        return result;
    };

    const updateChart = async (startDate, endDate) => {
        const newData = await fetchData(apiUrl, startDate, endDate);
        chartInstance.current.data.datasets.forEach((dataset, index) => {
            dataset.data = newData.datasets[index].data;
        });
        chartInstance.current.update();
    };

    const updateChartOptions = () => {
        const isDarkMode = theme === 'dark';
        const updatedOptions = {
            ...chartInstance.current.options,
            plugins: {
                legend: {
                    labels: {
                        color: isDarkMode ? '#ffffff' : '#000000'
                    }
                }
            }
        };

        if (chartInstance.current.options.scales && type !== 'pie') {
            updatedOptions.scales = {
                x: {
                    ticks: {
                        color: isDarkMode ? '#ffffff' : '#000000'
                    }
                },
                y: {
                    ticks: {
                        color: isDarkMode ? '#ffffff' : '#000000'
                    }
                }
            };
        }

        chartInstance.current.options = updatedOptions;
        chartInstance.current.update();
    };

    useEffect(() => {
        const handleThemeChange = () => {
            setTheme(document.documentElement.getAttribute('data-theme'));
        };
        
        const observer = new MutationObserver(handleThemeChange);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const ctx = chartContainer.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type,
                data,
                options,
            });
        }

        return () => {
            chartInstance.current.destroy();
        };
    }, [chartContainer, data, options]);

    useEffect(() => {
        if (chartInstance.current) {
            updateChartOptions();
        }
    }, [theme]);

    return (
        <div className={styles.container}>
            {title && <h2>{title}</h2>}
            {apiUrl && (
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '10px' }}>
                    <div>
                        <label htmlFor="startDate">Start Date: </label>
                        <input type="date" id="startDate" />
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date: </label>
                        <input type="date" id="endDate" />
                    </div>
                    <button onClick={() => {
                        const startDate = document.getElementById('startDate').value;
                        const endDate = document.getElementById('endDate').value;
                        updateChart(startDate, endDate);
                    }}>
                        Update Chart
                    </button>
                </div>
            )}
            <canvas id={canvaId} ref={chartContainer} />
        </div>
    );
};

export default ChartComponent;
