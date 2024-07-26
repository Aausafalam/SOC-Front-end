import React from 'react'
import styles from "./index.module.css"
import VulnerabilityTable from '../../components/VulnerabilityTable'

const VulnerabilitiesModule = () => {
  return (<div className={styles.container}>
    <div className={styles.body}>
    <div className={styles.assets_table}>
      <VulnerabilityTable/>
     </div>
    </div>
  </div>
  )
}

export default VulnerabilitiesModule