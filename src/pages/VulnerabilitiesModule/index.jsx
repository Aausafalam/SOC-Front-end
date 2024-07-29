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
   
      useEffect(() => {
        fetchSeverity()
      },[])


  return (<div className={styles.container}>
    <div className={styles.body}>
        <div className={styles.vulnerability_stats}>
        <VulnerabilityStatusStats initialData={serverity}/>
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