import React from 'react'
import styles from "./index.module.css"
import ReactECharts from 'echarts-for-react';

const ConfigurationChart = ({isDarkMode}) => {

    const getOption = () => ({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['Score', 'Fail', 'Pass'],
          textStyle: {
            color: isDarkMode ? '#fff' : '#000',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'value',
            axisLabel: {
              color: isDarkMode ? '#fff' : '#000',
            },
          },
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: isDarkMode ? '#fff' : '#000',
            },
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
        ],
        series: [
          {
            name: 'Score',
            type: 'bar',
            label: {
              show: true,
              position: 'inside',
            },
            emphasis: {
              focus: 'series',
            },
            data: [200, 170, 240, 244, 200, 220, 210],
          },
          {
            name: 'Pass',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [320, 302, 341, 374, 390, 450, 420],
          },
          {
            name: 'Fail',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'left',
            },
            emphasis: {
              focus: 'series',
            },
            data: [-120, -132, -101, -134, -190, -230, -210],
          },
        ],
        textStyle: {
          color: isDarkMode ? '#fff' : '#000',
        },
        backgroundColor: isDarkMode ? '#333' : '#fff',
      });


  return (
    <div className={styles.container}>
         <ReactECharts option={getOption()} />
    </div>
  )
}

export default ConfigurationChart