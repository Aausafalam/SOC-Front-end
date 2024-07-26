import React, { useEffect, useMemo, useState } from "react";
import { useCase } from "../../context/CaseContext";
import Utils from "../../utils";
import Table from "../../components/Table/Table";
import Styles from "./styles/alert.module.css";
import AlertStatCards from "./components/AlertStatCards";
import AlertSecurityChart from "./components/charts/AlertSecurityChart";
import AlertStateChart from "./components/charts/AlertStateChart";
import { useAlert } from "../../context/AlertContext";

const Alert = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCase, setSelectedCase] = useState(null);
    const { AlertList, fetchAlertList, alertDetail, fetchAlertDetail} = useAlert();
  
    useEffect(() => {
        fetchAlertList();
    }, []);
  
    const togglePopup = () => setShowPopup(prev => !prev);
  
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
            "S.No.": { key: "S.No.", value: index + 1, removeFromAutoSuggestion: true },
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
        actionData: [
          {
            name: "Open",
            functions: (index) => handleViewDetail(index),
            label: "Open",
            Id: "Id"
          },
          {
            name: "delete",
            functions: (index) => { /* deleteNotice(index, data); */ },
            label: "Remove",
            Id: "Id"
          },
          {
            name: "Alert",
            functions: (index) => { /* deleteNotice(index, data); */ },
            label: "Open Alerts",
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
        <div className="table-container" style={{maxHeight:"76vh"}}>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
            {alertDetail && Object.entries(alertDetail)?.map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Alert;
