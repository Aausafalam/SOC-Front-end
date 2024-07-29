import React from 'react';
import ReactECharts from 'echarts-for-react';
import './index.css'; // Import the CSS file

const EChartComponent = ({ isDarkMode, data }) => {
  const formattedData = formatDataForECharts(data);

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
        data: formattedData.yAxisData,
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
        data: formattedData.scoreData,
        // itemStyle: {
        //   color: 'blue',
        // },
      },
      {
        name: 'Fail',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: formattedData.failData,
        itemStyle: {
          color: '#ff6347',
        },
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
        data: formattedData.passData,
        itemStyle: {
          color: '#6fcd9e',
        },
      }
    ],
  });
  

  return <ReactECharts option={getOption()} />;
};

const formatDataForECharts = (data) => {
  
  if(data?.length === 0 || !data)
  {
    data = [
      {
        "details": {
          "fail": 108,
          "name": "CIS Ubuntu Linux 22.04 LTS Benchmark v1.0.0.",
          "pass": 72,
          "score": 40
        },
        "id": "000",
        "name": "mas"
      },
      {
        "details": {
          "fail": 108,
          "name": "CIS Ubuntu Linux 22.04 LTS Benchmark v1.0.0",
          "pass": 72,
          "score": 40
        },
        "id": "003",
        "name": "lcg1101"
      },
      {
        "details": {
          "fail": 262,
          "name": "CIS Microsoft Windows 11 Enterprise Benchmark v1.0.0",
          "pass": 129,
          "score": 32
        },
        "id": "012",
        "name": "DHE2112"
      },
      {
        "details": {
          "fail": 263,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 126,
          "score": 32
        },
        "id": "013",
        "name": "dhe2113"
      },
      {
        "details": {
          "fail": 106,
          "name": "CIS Ubuntu Linux 22.04 LTS Benchmark v1.0.0",
          "pass": 74,
          "score": 41
        },
        "id": "016",
        "name": "lhe1106"
      },
      {
        "details": {
          "fail": 108,
          "name": "CIS Ubuntu Linux 22.04 LTS Benchmark v1.0.0",
          "pass": 72,
          "score": 40
        },
        "id": "017",
        "name": "lhe1104"
      },
      {
        "details": {
          "fail": 218,
          "name": "CIS Microsoft Windows 11 Enterprise Benchmark v1.0.0",
          "pass": 173,
          "score": 44
        },
        "id": "019",
        "name": "LHE1105"
      },
      {
        "details": {
          "fail": 110,
          "name": "CIS Ubuntu Linux 22.04 LTS Benchmark v1.0.0.",
          "pass": 70,
          "score": 38
        },
        "id": "022",
        "name": "lhe1103"
      },
      {
        "details": {
          "fail": 269,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 121,
          "score": 31
        },
        "id": "024",
        "name": "LHE1102"
      },
      {
        "details": {
          "fail": 271,
          "name": "CIS Microsoft Windows 11 Enterprise Benchmark v1.0.0",
          "pass": 120,
          "score": 30
        },
        "id": "025",
        "name": "LHE1107"
      },
      {
        "details": {
          "fail": 108,
          "name": "CIS Ubuntu Linux 22.04 LTS Benchmark v1.0.0",
          "pass": 72,
          "score": 40
        },
        "id": "027",
        "name": "dhe2116"
      },
      {
        "details": {
          "fail": 263,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 127,
          "score": 32
        },
        "id": "028",
        "name": "dhi2117"
      },
      {
        "details": {
          "fail": 265,
          "name": "CIS Microsoft Windows 11 Enterprise Benchmark v1.0.0",
          "pass": 126,
          "score": 32
        },
        "id": "029",
        "name": "dhe2119"
      },
      {
        "details": {
          "fail": 263,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 127,
          "score": 32
        },
        "id": "030",
        "name": "dcg2118"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 186,
          "score": 47
        },
        "id": "032",
        "name": "DHEA01170"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 186,
          "score": 47
        },
        "id": "033",
        "name": "DHEA01148"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 186,
          "score": 47
        },
        "id": "034",
        "name": "DHEA01147"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 186,
          "score": 47
        },
        "id": "036",
        "name": "DHEA01150"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 186,
          "score": 47
        },
        "id": "037",
        "name": "DHEA01157"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 186,
          "score": 47
        },
        "id": "038",
        "name": "DHEA01133"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 11 Enterprise Benchmark v1.0.0",
          "pass": 187,
          "score": 47
        },
        "id": "040",
        "name": "DHEA01164"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 186,
          "score": 47
        },
        "id": "042",
        "name": "DHEA01129"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 186,
          "score": 47
        },
        "id": "043",
        "name": "DHEA01060"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 186,
          "score": 47
        },
        "id": "044",
        "name": "DHEA01136"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 186,
          "score": 47
        },
        "id": "045",
        "name": "DHEA01061"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 186,
          "score": 47
        },
        "id": "046",
        "name": "DHEA01151"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 186,
          "score": 47
        },
        "id": "048",
        "name": "DHEA01167"
      },
      {
        "details": {
          "fail": 264,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 126,
          "score": 32
        },
        "id": "049",
        "name": "DHEA01174"
      },
      {
        "details": {
          "fail": 98,
          "name": "CIS Ubuntu Linux 22.04 LTS Benchmark v1.0.0.",
          "pass": 63,
          "score": 39
        },
        "id": "050",
        "name": "dhea01173"
      },
      {
        "details": {
          "fail": 262,
          "name": "CIS Microsoft Windows 11 Enterprise Benchmark v1.0.0",
          "pass": 129,
          "score": 32
        },
        "id": "051",
        "name": "DHEA01045"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 185,
          "score": 47
        },
        "id": "052",
        "name": "DHEA01059"
      },
      {
        "details": {
          "fail": 261,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 129,
          "score": 33
        },
        "id": "053",
        "name": "DHEA01105"
      },
      {
        "details": {
          "fail": 257,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 133,
          "score": 34
        },
        "id": "054",
        "name": "LHEA01130"
      },
      {
        "details": {
          "fail": 265,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 125,
          "score": 32
        },
        "id": "056",
        "name": "LSEA01"
      },
      {
        "details": {
          "fail": 263,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 127,
          "score": 32
        },
        "id": "057",
        "name": "LHEA01143"
      },
      {
        "details": {
          "fail": 264,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 126,
          "score": 32
        },
        "id": "058",
        "name": "LHEA01092"
      },
      {
        "details": {
          "fail": 263,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 127,
          "score": 32
        },
        "id": "059",
        "name": "DHEA02143"
      },
      {
        "details": {
          "fail": 263,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 127,
          "score": 32
        },
        "id": "060",
        "name": "DHEA02092"
      },
      {
        "details": {
          "fail": 264,
          "name": "CIS Microsoft Windows 11 Enterprise Benchmark v1.0.0",
          "pass": 127,
          "score": 32
        },
        "id": "061",
        "name": "DHEA0115"
      },
      {
        "details": {
          "fail": 205,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 187,
          "score": 47
        },
        "id": "062",
        "name": "DHEA01024"
      },
      {
        "details": {
          "fail": 247,
          "name": "CIS Microsoft Windows 11 Enterprise Benchmark v1.0.0",
          "pass": 144,
          "score": 36
        },
        "id": "063",
        "name": "DHEA01040"
      },
      {
        "details": {
          "fail": 108,
          "name": "CIS Ubuntu Linux 22.04 LTS Benchmark v1.0.0.",
          "pass": 72,
          "score": 40
        },
        "id": "064",
        "name": "DHEA01031"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 11 Enterprise Benchmark v1.0.0",
          "pass": 187,
          "score": 47
        },
        "id": "065",
        "name": "DHEA01178"
      },
      {
        "details": {
          "fail": 263,
          "name": "CIS Microsoft Windows 11 Enterprise Benchmark v1.0.0",
          "pass": 128,
          "score": 32
        },
        "id": "066",
        "name": "DHEA01179"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 11 Enterprise Benchmark v1.0.0",
          "pass": 187,
          "score": 47
        },
        "id": "067",
        "name": "DHEA01177"
      },
      {
        "details": {
          "fail": 206,
          "name": "CIS Microsoft Windows 11 Enterprise Benchmark v1.0.0",
          "pass": 187,
          "score": 47
        },
        "id": "068",
        "name": "DHEA01176"
      },
      {
        "details": {
          "fail": 266,
          "name": "CIS Microsoft Windows 11 Enterprise Benchmark v1.0.0",
          "pass": 125,
          "score": 31
        },
        "id": "069",
        "name": "DHEA01187"
      },
      {
        "details": {
          "fail": 263,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 127,
          "score": 32
        },
        "id": "070",
        "name": "DCGA01025"
      },
      {
        "details": {
          "fail": 263,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 127,
          "score": 32
        },
        "id": "071",
        "name": "DCGA01063"
      },
      {
        "details": {
          "fail": 264,
          "name": "CIS Microsoft Windows 11 Enterprise Benchmark v1.0.0",
          "pass": 127,
          "score": 32
        },
        "id": "072",
        "name": "DHEA01182"
      },
      {
        "details": {
          "fail": 259,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 131,
          "score": 33
        },
        "id": "073",
        "name": "DHEA01184"
      },
      {
        "details": {
          "fail": 263,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 127,
          "score": 32
        },
        "id": "074",
        "name": "DHEA01183"
      },
      {
        "details": {
          "fail": 249,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 141,
          "score": 36
        },
        "id": "075",
        "name": "LCEA011978"
      },
      {
        "details": {
          "fail": 263,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 127,
          "score": 32
        },
        "id": "076",
        "name": "DHEA02145"
      },
      {
        "details": {
          "fail": 248,
          "name": "CIS Microsoft Windows 10 Enterprise Benchmark v1.12.0",
          "pass": 142,
          "score": 36
        },
        "id": "077",
        "name": "LSEA02"
      }
    ]
    
  }


  const yAxisData = data.map(item => item.name);
  const scoreData = data.map(item => item.details.score);
  const failData = data.map(item => item.details.fail);
  const passData = data.map(item => item.details.pass);

  return {
    yAxisData,
    scoreData,
    failData,
    passData,
  };
};

export default EChartComponent