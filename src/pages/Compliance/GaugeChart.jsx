// GaugeChartComponent.jsx
import React from 'react';
import ReactECharts from 'echarts-for-react';

const GaugeChartComponent = ({ value, title }) => {
  const option = {
    series: [
      {
        name: title,
        type: 'gauge',
        progress: {
          show: true,
          width: 18
        },
        axisLine: {
          lineStyle: {
            width: 30
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        pointer: {
          width: 5
        },
        title: {
          show: true,
          fontSize: 20
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          fontSize: 30,
          textStyle: {
            color: '#6E6E6E' // Neutral gray color
          }
        },
        data: [{ value: value, name: title }]
      }
    ]
  };

  return (
    <ReactECharts
      option={option}
      style={{  width: '70%', alignSelf:'center', margin:'0'  }}
    />
  );
};

export default GaugeChartComponent;
