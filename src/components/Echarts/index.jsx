// src/components/EChartsComponent.js
import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import styles from "./index.module.css";

const EChartsComponent = ({ options }) => {
  const chartRef = useRef(null);
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current, theme);
    chartInstance.setOption({ ...options, title: { ...options.title, text: "" } });

    return () => {
      chartInstance.dispose();
    };
  }, [options, theme]);

  useEffect(() => {
    const themeChangeHandler = () => {
      const newTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(newTheme);
    };

    window.addEventListener('themechange', themeChangeHandler);

    return () => {
      window.removeEventListener('themechange', themeChangeHandler);
    };
  }, []);

  return (
    <div className={styles.container}>
      {options?.title?.text && (
        <h2>
          {options?.title?.text}
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" strokeWidth="0.50">
                <circle cx="5" cy="12" r="2"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <circle cx="19" cy="12" r="2"></circle>
              </g>
            </svg>
          </span>
        </h2>
      )}
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default EChartsComponent;
