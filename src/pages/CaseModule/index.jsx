import React, { useEffect, useState } from "react";
import { useCase } from "../../context/CaseContext";
import Utils from "../../utils";
import Table from "../../components/Table/Table";
import Styles from "./styles/case.module.css";
import Card from "./components/Card";
import Popup from "../../components/Popup/Popup";
import CaseForm from "./components/CaseForm";
import SeverityCountChart from "./components/Charts/SeverityCountChart";
import CaseStatsCards from "./components/CaseStatsCards";
import CaseStateChart from "./components/Charts/CaseStateChart";

const Case = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const { caseList, fetchCaseList } = useCase();

  useEffect(() => {
    fetchCaseList();
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

  const handleEditCaseDetails = (id, data, type) => {
    const caseData = data?.result?.find((item) => item.id === id);
    if (caseData) {
      setSelectedCase({ ...caseData, type });
      togglePopup();
    }
  };

  const handleSuccess = () => {
    togglePopup();
    fetchCaseList();
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
          functions: (index) => handleEditCaseDetails(index, data),
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

  const tableData = React.useMemo(() => getTableData(caseList), [caseList]);

  return (
    <div>
      <div className={Styles.main_container}>
        <CaseStatsCards />
        <div className={Styles.case_chart_container}>
          <div><SeverityCountChart /></div>
          <div><CaseStateChart /></div>
        </div>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Table tableData={tableData} />
      </div>
      <Popup width="70%" show={showPopup} onClose={togglePopup} title={`Edit- Case Id: #${selectedCase?.id}`}>
        <CaseForm data={selectedCase} onSuccess={handleSuccess} onCancel={togglePopup} />
      </Popup>
    </div>
  );
};

export default Case;
