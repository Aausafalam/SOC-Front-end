import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import Style from './Main.module.css';  // Import CSS module

Chart.register(...registerables);

const HistogramChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';

    // Destroy previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(d => d.time),
        datasets: [
          {
            label: `Log Count (${data.length})`,
            data: data.map(d => d.count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: isDarkTheme ? 'white' : 'rgba(75, 192, 192, 1)', // Use white for dark theme
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Count: ${context.raw}`;
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup the chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className={Style.histogram_chart_container}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default HistogramChart;
