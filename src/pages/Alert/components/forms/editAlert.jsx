import React, { useState } from 'react'
import styles from "./index.module.css"
import DynamicForm from '../../../../components/Form/DynamicForm';
import { ICON } from '../../../../utils/icon';
import Popup from '../../../../components/Popup/Popup';

const EditAlertForm = ({handleSubmit,onCancel}) => {
  
    const states = [{label:"New", value:"New"}, {label:"Opened", value:"Opened"}, 
    {label:"Escalated with CaseId", value:"Escalated with CaseId"},
    {label:"Duplicate", value:"Duplicate"},
    {label:"False Positive", value:"False Positive"},
    {label:"Archived", value:"Archived"},
    {label:"Closed", value:"Closed"},
    {label:"Re-Assigned", value:"Re-Assigned"}, 
];
 
const [showCaseIdPopUp,setShowCaseIdPopUp] = useState(false)



    const formData = [
        {
          type: "textarea",
          name: "intel",
          label: "Intel",
          required: true,
          grid:3,
        },
        {
            type: "select",
            name: "state",
            label: "State",
            grid: 3,
            required: true,
            options: states,
        },
        // {
        //   type: "text",
        //   name: "caseid",
        //   label: "Case Id",
        //   grid: 3,
        //   required: true,
        // },
        // {
        //   type: "button",
        //   name: "caseid",
        //   label: "Show Case Id",
        //   grid: 3,
        //   required: true,
        //   show:true
        // },
        {
            type: "textarea",
            name: "remarks",
            label: "Remarks",
            grid: 3,
            required: true,
        },
        {
            type:"text",
            name:"domains",
            label:"Domains",
            grid:3,
            required:true
        },
        {
            type:"text",
            name:"ips",
            label:"IPS",
            grid:3,
            required:true
        },
        {
            type:"text",
            name:"urls",
            label:"URLS",
            grid:3,
            required:true
        },
        {
            type:"text",
            name:"file_hashes",
            label:"File Hashes",
            grid:3,
            required:true
        }
      ];
  
       
      const buttons = [
        {
          label: "Submit",
          className: "btn-green",
          type: "Submit",
          icon: ICON.CHECK_MARK,
        },
        {
          label: "Cancel",
          className: "btn-red",
          onClick: onCancel,
          icon: ICON.CANCEL,
        },
      ];

   const togglePopup = () => setShowCaseIdPopUp(!showCaseIdPopUp)

  return (<div className={styles.container}>
    <h3>Edit Alert Details</h3>
    


    <div className={styles.caseid_input}>
    <div className="form-group">
      <label for="domainsmain">Case Id <span style={{color:"red"}}>&nbsp;*</span></label>
      <input type="text" id="caseid" name="caseid" class="form-control" required="true" value=""/>
      </div>
      <button>Show Case Ids</button>
    </div>

    <DynamicForm
        formData={formData}
        formButtons={buttons}
        onSubmit={handleSubmit}
      />
     
     <Popup  width="70%" show={showCaseIdPopUp} onClose={togglePopup} title={`Case Id List`}>
      
     </Popup>
     
     


  </div>
  )
}

export default EditAlertForm