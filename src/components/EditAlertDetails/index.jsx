import React from 'react';
import styles from "./index.module.css";
import EditAlertForm from '../../pages/Alert/components/forms/editAlert';

const EditAlertDetails = ({data,id,onCancel,handleSubmit,setCaseIds}) => {
  return (<div className={styles.container}>
      <div>
        <EditAlertForm setCaseIds={setCaseIds} id={id} onCancel={onCancel} handleSubmit={handleSubmit}/>
      </div>
      <div>
      <div className={`table-container ${styles.alert_details_view}`}>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
            {data && Object.entries(data)?.map(([key, value]) => {
                if(typeof value === "object")
                {
                  return <tr key={key}>
                  <td>{key}</td>
                  <td>{value?.name}</td>
                </tr>
                }
                return <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
})}
            </tbody>
          </table>
        </div>
      </div>
  </div>
  )
}

export default EditAlertDetails