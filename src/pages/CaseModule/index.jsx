import React, { useEffect, useState } from "react";
import { useCase } from "../../context/CaseContext";
import Utils from "../../utils";
import Table from "../../components/Table/Table";
import Styles from "./styles/case.module.css";
import Popup from "../../components/Popup/Popup";
import SeverityCountChart from "./components/Charts/SeverityCountChart";
import CaseStatsCards from "./components/CaseStatsCards";
import CaseStateChart from "./components/Charts/CaseStateChart";
import { constants } from "../../utils/constants";
import CaseTabForm from "./components/CaseTabForm";
import { ICON } from "../../utils/icon";
import CaseForm from "./components/CaseForm";

const Case = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showAddCasePopup, setShowAddCasePopup] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const { caseList, fetchCaseList } = useCase();

  useEffect(() => {
    fetchCaseList();
  }, []);

  const togglePopup = () => setShowPopup(prev => !prev);
  const toggleAddCasePopup = () => setShowAddCasePopup(prev => !prev);

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
    const caseData = data[0]?.find((item) => item.id === id);
    if (caseData) {
      setSelectedCase({ ...caseData, type });
      togglePopup();
    }
  };

  const handleSuccess = async (type="add") => {
    if(type=="add"){
      toggleAddCasePopup();
    }else{
      togglePopup();
    }
    await fetchCaseList();
  };

  const [filterOptions, setFilterOptions] = useState({
    radioButtons: {
      key : "severity",
      data : [
        { label: "High", value: "3" },
        { label: "Medium", value: "2" },
        { label: "Low", value: "1" },
      ]
    },
    selectBox: {
      key:"caseState",
      data:[
        { label: "New", value: "0" },
        { label: "InProgress", value: "1" },
        { label: "OnHold", value: "2" },
        { label: "Closed", value: "3" },
      ],
    }
  });

  const getTableData = (data) => {
    return {
      ...Utils.GetTableData(),
      title: (<button className="btn-green" onClick={toggleAddCasePopup}>{ICON.PLUS}Create Case</button>),
      rows: data[0]?.map((item, index) => {
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
      ],
      action: true,
      searchUrl: constants.API_URLS.SEARCH_CASE,
      exportDataUrl: false,
      printUrl: false,
      paginationUrl: constants.API_URLS.PAGINATE_CASE,
      totalPage: parseInt(data[1]?.totalRecords/data[1]?.limit),
      totalItemCount: data[1]?.totalRecords,
      // autoSuggestionUrl: "/caseData.json",
      initialSort: "severity",
      getTableData: getTableData
    };
  };

  const tableData = React.useMemo(() => getTableData(caseList), [caseList, toggleAddCasePopup]);

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
        <Table tableData={tableData} filterOptions={filterOptions} />
      </div>

      <Popup width="70%" show={showAddCasePopup} onClose={toggleAddCasePopup} title="Add Case">
        <CaseForm onSuccess={()=>handleSuccess("add")} onCancel={toggleAddCasePopup} /> 
      </Popup>

      <Popup width="70%" show={showPopup} onClose={togglePopup} title={`Edit- Case Id: #${selectedCase?.id}`}>
        <CaseTabForm data={selectedCase} onSuccess={()=>handleSuccess("edit")} onCancel={togglePopup} />
      </Popup>
    </div>
  );
};

export default Case;
