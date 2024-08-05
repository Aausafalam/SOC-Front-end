// AssetsCountChart.js
import React, { useEffect, useState } from 'react';
import ChartComponent from '../Chart';
import { ICON } from '../../utils/icon';
import styles from "./index.module.css"
import { Line, Circle } from 'rc-progress';
import ProgressBar from '../progressBar';
import harwareIcon from "./icons/hardware.svg";
import softwareIcon from "./icons/software.svg";
import criticalIcon from "./icons/critical.svg";
import agentIcon from "./icons/agent.svg";




const AssestCriticalCount = ({initialData}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const roles = ["Expired", "Public Facing Web Application", "Unverified"];

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
                    backgroundColor: ['blue', 'red', 'orange', 'green', 'purple'],
                    data: [82, 140, 350, 100],
                }]
            };
        }
    };

    function calculatePercentages(data) {
        return data.map(item => {
            const percentage = item.total ? (item.value / item.total) * 100 : 0;
            return {
                ...item,
                percentage: percentage.toFixed(2)  // Format to 2 decimal places
            };
        });
    }

    useEffect(() => {
        (async () => {
            // const initialData = await fetchDataInitially("http://172.29.26.147:3001/inventory/dashboard", "your-token-here");
            setData({
                // criticalApplications:initialData.criticalApplications,

            });
            setLoading(false);
        })();
    }, []);
    
    const datas = [
        {
            title:"Critical Applications",
            value:initialData?.criticalApplications || 0,
            total:initialData?.webApplication || 0,
            strokeColor:"#9460ff",
            icon:criticalIcon
        },
        {
            title:"Hardware Warranty Expired",
            value:initialData?.warrantyExpired || 0,
            total:initialData?.hardware || 0,
            strokeColor:"#6fcd9e",
            icon:harwareIcon
            
        },
        {
            title:"Software License Expired",
            value:initialData?.licenceExpired || 1,
            total:initialData?.software || 5,
            strokeColor:"#ff8e06",
            icon:softwareIcon
        },
        {
            title:"Active Agents",
            value:initialData?.agentInstalled || 0,
            total:initialData?.agentCanInstall || 0,
            strokeColor:"#2265bb",
            icon:agentIcon
        }
        
    ]


    //console.log( "qrerewrttwrt>>..................", initialData)

    return (
        <div className={styles.container}>
            <h2>Critical Stats <span><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="0.50"><circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle></g></svg></span></h2>
             <div className={styles.body}>
              <div>
                {
                    calculatePercentages(datas).map((item) => (
                        <div>
                        <ProgressBar 
                        data={{
                            title:item.title,
                            value:item.value,
                            strokeColor:item.strokeColor,
                            percentage:item.percentage,
                            icon:item.icon
                        }}/>
                    </div>
                    ))
                }
              </div>
             </div>
        </div>
    );
};

export default AssestCriticalCount;
