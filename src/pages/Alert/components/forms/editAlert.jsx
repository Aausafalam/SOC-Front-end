import React, { useEffect, useState } from 'react'
import styles from "./index.module.css"
import DynamicForm from '../../../../components/Form/DynamicForm';
import { ICON } from '../../../../utils/icon';
import Popup from '../../../../components/Popup/Popup';
import { useCase } from '../../../../context/CaseContext';
import Utils from '../../../../utils';
import Table from '../../../../components/Table/Table';

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
  
   const { caseList, fetchCaseList } = useCase();

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
      rows: data?.result?.map((item, index) => {
        const severity = getSeverity(item.severity);
        const severityClass = `badge-${severity}`;
        const statusClass = getStatusBadgeClass(item.caseStateName);

        return {
          Id: { key: "id", value: item.id, type: "hidden" },
          "Action": { key: "data", value: "e", type:"checkbox" ,viewAs:true },
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
      action: false,
      export:false,
      print:false,
      searchUrl: "/caseData.json",
      exportDataUrl: "/caseData.json",
      printUrl: "/caseData.json",
      paginationUrl: "/caseData.json",
      totalPage: data?.totalPages,
      totalItemCount: data?.totalDocuments,
      autoSuggestionUrl: "/caseData.json",
      initialSort: "severity",
      getTableData: getTableData
    };
  };

  const tableData = React.useMemo(() => getTableData(caseList), [caseList]);

  
  console.log( "rerwe",tableData)


  return (<div className={styles.container}>
    <h3>Edit Alert Details</h3>
    


    <div className={styles.caseid_input}>
    <div className="form-group">
      <label for="domainsmain">Case Id <span style={{color:"red"}}>&nbsp;*</span></label>
      <input type="text" id="caseid" name="caseid" class="form-control" required="true" value=""/>
      </div>
      <button onClick={() => {setShowCaseIdPopUp(true);
      fetchCaseList();}}>Show Case Ids</button>
    </div>

    <DynamicForm
        formData={formData}
        formButtons={buttons}
        onSubmit={handleSubmit}
      />
     
     <Popup  width="70%" show={showCaseIdPopUp} onClose={togglePopup} title={`Case Id List`}>
     <Table tableData={tableData} />
     </Popup>
     
     


  </div>
  )
}

export default EditAlertForm