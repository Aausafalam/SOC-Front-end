import React from 'react'
import styles from "./index.module.css"
import ConfigurationChart from '../../components/configurationChart'
import ConfigurationTable from '../../components/ConfigurationTable'

const Configuration = () => {
  return (
    <div className={styles.container}>
         
        <div className={styles.body}>
        <div>
            <h3> Configuration Chart</h3>
             <ConfigurationChart isDarkMode={false}/>
         </div>
          
         
          <div>
          <ConfigurationTable/>

            

          </div>


        </div>



    </div>
  )
}

export default Configuration