import React, { useEffect, useMemo, useState } from "react";
import { useCase } from "../../context/CaseContext";
import Utils from "../../utils";
import Table from "../../components/Table/Table";
import Styles from "./styles/alert.module.css";
import AlertStatCards from "./components/AlertStatCards";
import AlertSecurityChart from "./components/charts/AlertSecurityChart";
import AlertStateChart from "./components/charts/AlertStateChart";
import { useAlert } from "../../context/AlertContext";
import Popup from "../../components/Popup/Popup";
import EditAlertDetails from "../../components/EditAlertDetails";
import { toast } from "react-toastify";
// import Popup from '../Popup/Popup';

const Alert = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCase, setSelectedCase] = useState(null);
    const { AlertList, fetchAlertList, alertDetail, fetchAlertDetail} = useAlert();
    const [showEditPop,setShowEditPopup] = useState(false);
    const [id,setId] = useState(null);
    const [caseIds,setCaseIds] = useState([]) 
    const [showMore,setShowMore] = useState(false)

    useEffect(() => {
        fetchAlertList();
    }, []);
    
    useEffect(() => {
      AlertList?.length > 0 && fetchAlertDetail(AlertList[0][0].id)
    },[AlertList])

  
    const togglePopup = () => setShowEditPopup(prev => !prev);
  
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

    const handleViewDetail = async (id) => {
        await fetchAlertDetail(id);
    }
  
    const handleEditCaseDetails = (id, data, type) => {
      const caseData = data?.result?.find((item) => item.id === id);
      if (caseData) {
        setSelectedCase({ ...caseData, type });
        togglePopup();
      }
    };
  
    const handleSuccess = () => {
      togglePopup();
      fetchAlertList();
    };
    
    const onSuccess = (data) => {
      console.log(data)
    }


    const handleSubmit = (data) => {
      toast("Updated ....")
      togglePopup()
    }



    // const togglePopup = () => setShowPopup(prev => !prev);
    const getTableData = (data) => {
      console.log( " dfdsfdsf",data[1])
      return {
        ...Utils.GetTableData(),
        title: "All Alerts",
        rows: data[0]?.map((item, index) => {
          const severity = getSeverity(item.severity);
          const severityClass = `badge-${severity}`;
          const statusClass = "";
  
          return {
            Id: { key: "id", value: item.id},
            "Created At": { key: "createdAt", value: Utils.getFormatedDate(item.createdAt) },
            "Updated At": { key: "updatedAt", value: Utils.getFormatedDate(item.updatedAt) },
            "Status": { key: "alertStateName", value: item.alertStateName },
            "Category": { key: "category", value: Utils.capitalizeEachWord(item.category) },
            
            Severity: {
              key: "severity",
              value: <span className={severityClass}>{Utils.capitalizeEachWord(severity)}</span>,
              originalValue: severity
            },
            "Signature": {
              key: "signature",
              value: <span className={statusClass}>{Utils.capitalizeEachWord(item.signature)}</span>,
              originalValue: item.signature
            }
          };
        }),
        actionData: [
          // {
          //   name: "Open",
          //   functions: (index) => handleViewDetail(index),
          //   label: "Open",
          //   Id: "Id"
          // },
          // {
          //   name: "delete",
          //   functions: (index) => { /* deleteNotice(index, data); */ },
          //   label: "Remove",
          //   Id: "Id"
          // },
          {
            name: "Alert",
            functions: (index) => { 
              setId(index);
              handleViewDetail(index)
              setShowEditPopup(true);
             },
            label: "Resolve",
            Id: "Id"
          },
          {
            name: "Close",
            functions: (index) => { /* deleteNotice(index, data); */ },
            label: "Close",
            Id: "Id"
          }
        ],
        action: true,
        export:false,
        print:false,
        searchUrl: "http://192.168.40.48:8080/api/alerts?page=input&limit=count&id=searchText",
        exportDataUrl:false,
        printUrl: false,
        paginationUrl: "http://192.168.40.48:8080/api/alerts?page=input&limit=count",
        totalPage: parseInt(data[1]?.totalRecords/data[1]?.limit),
        totalItemCount: data[1]?.totalRecords,
        autoSuggestionUrl: "/caseData.json",
        initialSort: "severity",
        getTableData: getTableData,
        rowClickHandler: (id) => {
          handleViewDetail(id)
        }
      };
    };
    

   console.log(alertDetail)

    
    
    
    const tableData = React.useMemo(() => getTableData(AlertList), [AlertList]);

  return (
    <div>
      <div className={Styles.main_container}>
        <AlertStatCards />
        <div className={Styles.case_chart_container}>
          <div><AlertSecurityChart /></div>
          <div><AlertStateChart /></div>
        </div>
      </div>
      <div className={Styles.content_container}>
        <Table tableData={tableData} />
        <div className={`table-container ${Styles.alert_details_view}`}>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
            {alertDetail && Object.entries(alertDetail.alertDetails || {})?.map(([key, value]) => {
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
          <button onClick={() => setShowMore(!showMore)} className={Styles.view_more}>{showMore ? "Hide" : "View"} More</button>
          {
            showMore && Utils.renderJson(alertDetail?._source || {})
          }
        </div>
      </div>
      <Popup width="90%" show={showEditPop} onClose={togglePopup} title={`Details`}>
        <EditAlertDetails cases={alertDetail?.cases || []}  setCaseIds={setCaseIds} data={alertDetail?.alertDetails || {}} source={alertDetail?._source} id={id} onCancel={togglePopup} onSuccess={handleSubmit}/>
      </Popup>
    </div>
  );
};

export default Alert;
