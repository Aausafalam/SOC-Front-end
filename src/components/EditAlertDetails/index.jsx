import React, { useState } from 'react';
import styles from "./index.module.css";
import EditAlertForm from '../../pages/Alert/components/forms/editAlert';
import Utils from '../../utils';

const EditAlertDetails = ({data,id,onCancel,onSuccess,source}) => {
   
  const [caseIds,setCaseIds] = useState({})
  const [caseIdInput,setCaseIdsInput] = useState("")
  const [showMore,setShowMore] = useState(false)

  return (<div className={styles.container}>
      <div>
        <EditAlertForm onSuccess={onSuccess} id={id} caseIdInput={caseIdInput} setCaseIdsInput={setCaseIdsInput}  caseIds={caseIds} setCaseIds={setCaseIds}  onCancel={onCancel} />
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
          <button onClick={() => setShowMore(!showMore)} className={styles.view_more}>{showMore ? "Hide" : "View"} More</button>
          {
           showMore &&  Utils.renderJson(source)
          }
        </div>
      </div>
  </div>
  )
}

export default EditAlertDetails