import React, { useEffect, useState } from 'react'
import styles from "./index.module.css"
import VulnerabilityTable from '../../components/VulnerabilityPendingTable'
import VulnerabilityOpenTicketTable from '../../components/VulnerabilityOpenTicketTable'
import VulnerabilityStatusStats from '../../components/VulnerabilityStatusStats'
import Popup from '../../components/Popup/Popup'
import ManualAssesment from './ManualAssesment'
import { useVulnerability } from '../../context/VulnerabilityContext'
import axios from 'axios';
import {  toast } from 'react-toastify';
import EChartsComponent from '../../components/Echarts'

const VulnerabilitiesModule = () => {
  
    const [tab,setTab] = useState(1);
    const [serverity,setSeverity] = useState({
        critical:0,
        high:0,
        low:0,
        medium:0,
        total:0
    })
    const [showManualAssesmentpopUp,setShowManualAssesmentpopUp] = useState(false)
    const {fetchVulnerabilityList} = useVulnerability()
    const tabData = [
        {
            name:"Pending",
            tab:1
        },
        {
            name:"Open Ticket",
            tab:2
        }
    ]
    
    const togglePopup = () => setShowManualAssesmentpopUp(prev => !prev);
    const onSuccess = (data) => {
        toast(data)
        setShowManualAssesmentpopUp(false)
         fetchVulnerabilityList()
      }

     
      const fetchSeverity = () =>{
        axios.get("http://192.168.40.52:5000/api/severity_count").then((response) => {
            console.log(response.data)
            setSeverity(response.data)
        }).catch((error) => {
            console.log(error);
        });
      }
      const [radialPolarData, setRadialPolarData] = useState([]);
      const [verticalStackedBarData, setVerticalStackedBarData] = useState([]);
      const [pieDataStatus, setPieDataStatus] = useState([]);

      const radialPolarOptions = {
        title: {
          text: 'Vulnerabilities per Operating System',
          left: 'center',
        },
        tooltip: {},
        polar: {
          radius: '70%',
        },
        angleAxis: {
          type: 'category',
          data: radialPolarData.map(item => item.category),
          axisLine: { lineStyle: { color: '#999' } },
        },
        radiusAxis: {
          type: 'value',
          min: 0,
          max: Math.max(...radialPolarData.map(item => item.value)), // Adjust max value
          axisLine: { lineStyle: { color: '#999' } },
        },
        series: [
          {
            type: 'bar',
            data: radialPolarData.map(item => item.value),
            coordinateSystem: 'polar',
            stack: 'a',
            emphasis: {
              focus: 'series',
            },
            label: {
              show: true,
              position: 'middle',
              formatter: '{c}'
            },
            itemStyle: {
              color: (params) => {
                const colors = ['#FF5733', '#33FF57', '#3357FF', '#F4C542', '#42F4C5'];
                return colors[params.dataIndex];
              }
            }
          },
        ],
      };
       
      useEffect(() => {
        // Fetch data from server
        const fetchData = () => {
          // Fetch data for the radial polar chart
          axios.get('http://192.168.40.52:5000/api/get_vuln_os_count')
            .then(radialResponse => {
              // Set the radial polar data from the response
              setRadialPolarData(radialResponse.data);
    
              // Fetch data for the horizontal bar chart after radial data is successfully fetched
              return axios.get('http://192.168.40.52:5000/api/get_status_count');
            })
            .then(pieResponse => {
                // Set the horizontal bar data from the response
                setPieDataStatus(pieResponse.data);
    
              // Fetch data for the vertical stacked bar chart
              return axios.get('http://192.168.40.52:5000/api/get_reportedDate_count');
            })
            .then(verticalResponse => {
              // Set the vertical stacked bar data from the response
              setVerticalStackedBarData(verticalResponse.data);
            })
            .catch(error => {
              // Handle errors for both requests
              console.error('Error fetching data:', error.message);
            });
        };
    
        fetchData();
      }, []);


      useEffect(() => {
        fetchSeverity()
      },[])

      
      const verticalStackedBarOptions = {
        title: {
          text: 'Vulnerabiities Detected by Day',
          subtext: 'Daily Data for July',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['Critical', 'High', 'Medium', 'Low'],
          bottom: 0,
          // color: '#ee6666'
        },
        xAxis: {
          type: 'category',
          data: Array.from({ length: 31 }, (_, i) => i + 1), // Days of July (1 to 31)
          axisLine: { lineStyle: { color: '#999' } },
        },
        yAxis: {
          type: 'value',
          axisLabel: { formatter: '{value}' },
          axisLine: { lineStyle: { color: '#999' } },
        },
        series: [
          {
            name: 'Critical',
            type: 'bar',
            stack: 'total',
            data: verticalStackedBarData.map(item => item.critical),
            itemStyle: { color: '#FF0000' },
          },
          {
            name: 'High',
            type: 'bar',
            stack: 'total',
            data: verticalStackedBarData.map(item => item.high),
            itemStyle: { color: '#FF8C00' },
          },
          {
            name: 'Medium',
            type: 'bar',
            stack: 'total',
            data: verticalStackedBarData.map(item => item.medium),
            itemStyle: { color: '#FFD700' },
          },
          {
            name: 'Low',
            type: 'bar',
            stack: 'total',
            data: verticalStackedBarData.map(item => item.low),
            itemStyle: { color: '#32CD32' },
          },
        ],
      };
      
      const pieOptionsStatus = {
        title: {
          text: 'Current Status of Tickets',
          // subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Status',
            type: 'pie',
            radius: '50%',
            data: pieDataStatus.map(item => ({ value: item.value, name: item.category }))
          }
        ]
      };




  return (<div className={styles.container}>
    <div className={styles.body}>
        <div className={styles.vulnerability_stats}>
          
          <div className={styles.vulnerability_count}>
          <VulnerabilityStatusStats initialData={serverity}/>
          </div>

          <div className="chart radial-polar-chart">
          <EChartsComponent options={radialPolarOptions} />
         </div>

         <div className="chart vertical-stacked-bar-chart">
          <EChartsComponent options={verticalStackedBarOptions} />
        </div>

        <div className="chart horizontal-bar-chart">
          <EChartsComponent options={pieOptionsStatus} />
        </div>


        </div>
    <div className={styles.vulnerability_header}>
    <div className={styles.tab}>
        {
            tabData.map((item) => (
                <h2 onClick={() => setTab(item.tab)} className={ tab === item.tab && styles.active}>{item.name}</h2>
            ))
        }
    
    </div>
    <div>
        <button onClick={() => setShowManualAssesmentpopUp(true)}><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 256 256"><path fill="currentColor" d="M228 40v40a12 12 0 0 1-24 0V52h-28a12 12 0 0 1 0-24h40a12 12 0 0 1 12 12M80 204H52v-28a12 12 0 0 0-24 0v40a12 12 0 0 0 12 12h40a12 12 0 0 0 0-24m136-40a12 12 0 0 0-12 12v28h-28a12 12 0 0 0 0 24h40a12 12 0 0 0 12-12v-40a12 12 0 0 0-12-12M40 92a12 12 0 0 0 12-12V52h28a12 12 0 0 0 0-24H40a12 12 0 0 0-12 12v40a12 12 0 0 0 12 12m44-20h88a12 12 0 0 1 12 12v88a12 12 0 0 1-12 12H84a12 12 0 0 1-12-12V84a12 12 0 0 1 12-12m12 88h64V96H96Z"/></svg>Manual Assessment</button>
    </div>
    </div>
    <div className={styles.assets_table}>
        {
            tab === 1 ? 
            <VulnerabilityTable/>
            : <VulnerabilityOpenTicketTable/>
        }
      
     </div>
     <Popup width="70%" show={showManualAssesmentpopUp} onClose={togglePopup} title={`Manual Assessment`}>
        <ManualAssesment onSuccess={onSuccess} onCancel={togglePopup}/>
     </Popup>
    </div>
  </div>
  )
}

export default VulnerabilitiesModule