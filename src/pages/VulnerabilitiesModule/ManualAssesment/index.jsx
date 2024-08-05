import React from 'react'
import { ICON } from '../../../utils/icon';
import DynamicForm from '../../../components/Form/DynamicForm';
import axios from 'axios';

const ManualAssesment = ({onCancel,onSuccess}) => {


    const assignees = [{label:"Rishik", value:"rishikj"}, {label:"Amit Negi", value:"Amit Negi"}, {label:"himanshu", value:"himanshu"}]
    

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

    const formData = [
        { label: 'Asset', name: 'asset', type: 'text',grid:3 },
        { label: 'IP Address', name: 'ipAddress', type: 'text',grid:3 },
        { label: 'Vulnerability Name', name: 'vulnerabilityName', type: 'text',grid:3 },
        { label: 'Severity', name: 'severity', type: 'text',grid:3 },
        { label: 'Severity Score', name: 'severityScore', type: 'text',grid:3 },
        { label: 'CVSS Vector', name: 'cvssVector', type: 'text',grid:3 },
        { label: 'Description', name: 'description', type: 'textarea',grid:3 },
        { label: 'References', name: 'references', type: 'textarea',grid:3 },
        { label: 'Remediation', name: 'remediation', type: 'textarea',grid:3 },
        // {
        //     type: "file",
        //     name: "poc",
        //     label: "POC",
        //     // required: true,
        //     grid:2,
        //   },
          {
            type: "select",
            name: "assignTo",
            label: "Assign To",
            grid: 2,
            required: true,
            options: assignees
        },
    ]
   
    const handleSubmit = async (formData) => {
        if (formData) {
         //console.log(formData)
         axios.post('http://192.168.40.52:5000/api/create_ticket', {  ...formData })
         .then(response => {
             onSuccess(response.data.status);
            //setDetailModalIsOpen(false);
        //    fetchData(); // Refresh the data
         })
         .catch(error => {
           console.error('Error creating ticket:', error)
           alert("Failed to create ticket. Please try again")
         });
        } else {
            //add
        }
         
      };
    

  return (<div>
      <DynamicForm
        formData={formData}
        formButtons={buttons}
        onSubmit={handleSubmit}
      />
  </div>
  )
}

export default ManualAssesment