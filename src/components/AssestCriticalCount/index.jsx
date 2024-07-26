// AssetsCountChart.js
import React, { useEffect, useState } from 'react';
import ChartComponent from '../Chart';
import { ICON } from '../../utils/icon';
import styles from "./index.module.css"
import { Line, Circle } from 'rc-progress';
import ProgressBar from '../progressBar';

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

    useEffect(() => {
        (async () => {
            // const initialData = await fetchDataInitially("http://172.29.26.147:3001/inventory/dashboard", "your-token-here");
            setData({
                // criticalApplications:initialData.criticalApplications,

            });
            setLoading(false);
        })();
    }, []);

    return (
        <div className={styles.container}>
            <h2>Critical Stats <span><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="0.50"><circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle></g></svg></span></h2>
             <div className={styles.body}>
              <div>
                <div>
                    <ProgressBar 
                    data={{
                        title:"Critical Applications",
                        value:20,
                        strokeColor:"#9460ff"
                    }}/>
                </div>
                <div>
                    <ProgressBar 
                    data={{
                        title:"Hardware Warranty Expired",
                        value:40,
                        strokeColor:"#6fcd9e"
                    }}/>
                </div>
                <div>
                    <ProgressBar 
                    data={{
                        title:"Software License Expired",
                        value:70,
                        strokeColor:"#ff8e06"
                    }}/>
                </div>
                <div>
                    <ProgressBar 
                    data={{
                        title:"Active Agents",
                        value:90,
                        strokeColor:"#388e3c"
                    }}/>
                </div>
              </div>
             </div>
        </div>
    );
};

export default AssestCriticalCount;
