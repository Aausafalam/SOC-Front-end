import React, { useEffect } from 'react'
import styles from "./index.module.css"
import ConfigurationChart from '../../components/configurationChart'
import ConfigurationTable from '../../components/ConfigurationTable'
import { useConfiguration } from '../../context/AlertContext copy'

const Configuration = () => {

   
    const {configurationList, fetchConfigurationList} = useConfiguration();
   
    useEffect(() => {
        fetchConfigurationList()
    },[])

  return (
    <div className={styles.container}>
         
        <div className={styles.body}>
        <div>
            <h3> Configuration Chart</h3>
             <ConfigurationChart data={configurationList}  isDarkMode={false}/>
         </div>
          
         
          <div>
          <ConfigurationTable data={configurationList}/>

            

          </div>


        </div>



    </div>
  )
}

export default Configuration