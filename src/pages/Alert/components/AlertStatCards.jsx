import axios from "axios";
import { ICON } from "../../../utils/icon";
import Styles from "../styles/alert.module.css";
import Card from "./card/Card";
import { useEffect, useState } from "react";

const AlertStatCards = () => {
     
    const [matricsData,setMatricsData] = useState({})
    const caseMatrixCounts = {
        totalAlerts:{
            count:matricsData?.totalAlerts || 0,
            percentageChangeWeek:null,
            percentageChangeMonth:null,
        },
        networkAlerts:{
            count:matricsData?.networkAlerts,
            percentageChangeWeek:-5,
            percentageChangeMonth:6,
        },
        endPointAlerts:{
            count:matricsData?.endpointAlerts,
            percentageChangeWeek:15,
            percentageChangeMonth:-8,
        }
    };
     
   
     
    const fetchData = () => {
        axios.get("http://192.168.40.48:8080/api/alerts/metrics")
        .then((response) => {
            console.log("wetrwtr",response.data)
            setMatricsData(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
// console.log("rewrwt",matricsData)
   
useEffect(() => {
    fetchData()
},[])
    return (
        <div className={Styles.case_overview_container}>
            <Card 
                label="Total Alerts" 
                count={caseMatrixCounts.totalAlerts.count} 
                percentageChangeWeek={caseMatrixCounts.totalAlerts.percentageChangeWeek} 
                percentageChangeMonth={caseMatrixCounts.totalAlerts.percentageChangeMonth} 
                icon={ICON.ALERT}
            />
            <Card 
                label="Network Alerts" 
                count={caseMatrixCounts.networkAlerts.count} 
                percentageChangeWeek={caseMatrixCounts.networkAlerts.percentageChangeWeek} 
                percentageChangeMonth={caseMatrixCounts.networkAlerts.percentageChangeMonth} 
                icon={ICON.PENDING}
            />
            <Card 
                label="EndPoint Alert" 
                count={caseMatrixCounts.endPointAlerts.count} 
                percentageChangeWeek={caseMatrixCounts.endPointAlerts.percentageChangeWeek} 
                percentageChangeMonth={caseMatrixCounts.endPointAlerts.percentageChangeMonth} 
                icon={ICON.CLOSED}
            />
            <Card 
                label="Pending Alerts" 
                count={caseMatrixCounts.networkAlerts.count} 
                percentageChangeWeek={caseMatrixCounts.networkAlerts.percentageChangeWeek} 
                percentageChangeMonth={caseMatrixCounts.networkAlerts.percentageChangeMonth} 
                icon={ICON.PENDING}
            />
        </div>
        )
}

export default AlertStatCards;