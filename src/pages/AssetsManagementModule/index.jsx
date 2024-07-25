import React from 'react'
import styles from "./index.module.css"
import AssetsCountChart from '../../components/AssestCountChart'
import AssestStatusCountChart from '../../components/AssestStatusCountChart'
import AssestCriticalCount from '../../components/AssestCriticalCount'
import AsstesTable from '../../components/AssetsTable'
import AssetsSbomTable from '../../components/AssetsSbomTable'

const AssetsManagementModule = () => {

  





  return (<div className={styles.container}>
     {/* <h1>Assets Management Module</h1> */}
   
     <div className={styles.body}>
      <div>
      <AssetsCountChart/>
        <div className={styles.total_assets_count}>
          <h2>Total Assets</h2> <h1>100</h1>
        </div>
      </div>
      <div className={styles.assets_status_count_chart}>
        <AssestStatusCountChart/>
      </div>
      <div>
        <AssestCriticalCount/>
      </div>
     
     <div className={styles.assets_table}>
      <AsstesTable/>
     </div>
     <div className={styles.assets_sbom_table}>
      <AssetsSbomTable/>
     </div>




     </div>
  </div>
  )
}

export default AssetsManagementModule
