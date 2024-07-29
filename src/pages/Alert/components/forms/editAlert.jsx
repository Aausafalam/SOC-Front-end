import React, { useEffect, useState } from 'react'
import styles from "./index.module.css"
import DynamicForm from '../../../../components/Form/DynamicForm';
import { ICON } from '../../../../utils/icon';
import Popup from '../../../../components/Popup/Popup';
import { useCase } from '../../../../context/CaseContext';
import Utils from '../../../../utils';
import Table from '../../../../components/Table/Table';
import { constants } from '../../../../utils/constants';
import axios from 'axios';

const EditAlertForm = ({id,onCancel,caseIds,setCaseIds,setCaseIdsInput,caseIdInput,onSuccess}) => {
  
    const states = [{label:"New", value:0}, {label:"Opened", value:1}, 
    {label:"Escalated with CaseId", value:2},
    {label:"Duplicate", value:3},
    {label:"False Positive", value:4},
    {label:"Archived", value:5},
    {label:"Closed", value:6},
    {label:"Re-Assigned", value:7}, 
];
 
const [showCaseIdPopUp,setShowCaseIdPopUp] = useState(false)


    const formData = [
        {
          type: "textarea",
          name: "intel",
          label: "Intel",
          required: true,
          grid:2,
        },
        {
            type: "select",
            name: "state",
            label: "State",
            grid: 2,
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
            grid: 2,
            required: true,
        },
        {
            type:"text",
            name:"domains",
            label:"Domains",
            grid:2,
            required:true
        },
        {
            type:"text",
            name:"ips",
            label:"IPS",
            grid:2,
            required:true
        },
        {
            type:"text",
            name:"urls",
            label:"URLS",
            grid:2,
            required:true
        },
        {
            type:"text",
            name:"file_hashes",
            label:"File Hashes",
            grid:2,
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
  
   const { caseList, fetchCaseList } = useCase();
    console.log(caseList)
   useEffect(() => {
   }, []);

   const getStatusBadgeClass = (status) => {
    const statusMap = {
      new: "badge-violet",
      inprogress: "badge-green",
      onhold: "badge-orange",
      closed: "badge-red"
    };
    return statusMap[status.toLowerCase()] || "";
  };

   const getSeverity = (severity) => {
    const severityMap = {
      1: "critical",
      2: "high",
      3: "medium",
      4: "low"
    };
    return severityMap[severity] || "NA";
  };

   const getTableData = (data) => {
    return {
      ...Utils.GetTableData(),
      title: "All Cases",
      rows: data[0]?.map((item, index) => {
        const severity = getSeverity(item.severity);
        const severityClass = `badge-${severity}`;
        const statusClass = getStatusBadgeClass(item.caseStateName);

        return {
          Id: { key: "id", value: item.id, type: "hidden" },
          "Action": { key: "data", name:item.id, value:item.id,checked:caseIds[item.id] , type:"checkbox" ,viewAs:true,
        onchange:(event) => {
          if(event.target.checked)
          {
            setCaseIds((data) => {
              return {...data,[event.target.name]:event.target.value}
            })
          }
          else
          {
            setCaseIds((data) => {
              return {...data,[event.target.name]:null}
            })
          }
        } },
          "Case ID": { key: "id", value: item.id },
          Title: { key: "title", value: Utils.capitalizeEachWord(item.title) },
          "Created At": { key: "createdAt", value: Utils.getFormatedDate(item.createdAt) },
          "Updated At": { key: "updatedAt", value: Utils.getFormatedDate(item.updatedAt) },
          Severity: {
            key: "severity",
            value: <span className={severityClass}>{Utils.capitalizeEachWord(severity)}</span>,
            originalValue: severity
          },
          "Case State": {
            key: "caseStateName",
            value: <span className={statusClass}>{Utils.capitalizeEachWord(item.caseStateName)}</span>,
            originalValue: item.caseStateName
          }
        };
      }),
      pagination:false,
      action: false,
      export:false,
      print:false,
      searchUrl: constants.API_URLS.SEARCH_CASE,
      exportDataUrl: false,
      printUrl: false,
      paginationUrl: constants.API_URLS.PAGINATE_CASE,
      totalPage: parseInt(data[1]?.totalRecords/10),
      totalItemCount: data[1]?.totalRecords,
      // autoSuggestionUrl: "/caseData.json",
      initialSort: "severity",
      limit:100,
      getTableData: getTableData
    };
  };

  const tableData = React.useMemo(() => getTableData(caseList), [caseList]);

  
  console.log( "rerwetey>>>>>>>>>>>>>>>",caseIds)
   
   
   

  const handleSubmit = async (formData) => {
    if (formData) {
     console.log({...formData,caseid:Object.entries(caseIds).map(([key, value]) => value)})
     axios.put(`http://192.168.40.48:8080/api/alerts/update/${id}`, {...formData,caseid:Object.entries(caseIds).map(([key, value]) => value)})
     .then(response => {
         onSuccess(response.data);
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



  return (<div className={styles.container}>
    <h3>Edit Alert Details</h3>
    


    <div className={styles.caseid_input}>
    <div className="form-group">
      <label for="domainsmain">Case Id <span style={{color:"red"}}>&nbsp;*</span></label>
      <input value={caseIdInput} onChange={(event) => {
           setCaseIdsInput(event.target.value)
      }} type="text" id="caseid" name="caseid" class="form-control" required="true"/>
      </div>
      <button onClick={() => {setShowCaseIdPopUp(!showCaseIdPopUp);
      fetchCaseList();}}>{showCaseIdPopUp ? "Hide" : "Show"} Case Ids</button>
    </div>

    {
      showCaseIdPopUp && 
      <div>
            <Table tableData={tableData} />
     <button type='button' className={styles.save_button} onClick={() => {
        setCaseIdsInput(Object.entries(caseIds).map(([key, value]) => value).join(","));
         togglePopup();
     }}>Save</button>
      </div>
     }


    <DynamicForm
        formData={formData}
        formButtons={buttons}
        onSubmit={handleSubmit}
      />
     
     {/* <Popup  width="70%" show={showCaseIdPopUp} onClose={togglePopup} title={`Case Id List`}> */}
     {/* {
      showCaseIdPopUp && 
      <div>
            <Table tableData={tableData} />
     <button type='button' className={styles.save_button} onClick={() => {
        setCaseIdsInput(Object.entries(caseIds).map(([key, value]) => value).join(","));
         togglePopup();
     }}>Save</button>
      </div>
     } */}
     {/* </Popup> */}
     
     


  </div>
  )
}

export default EditAlertForm