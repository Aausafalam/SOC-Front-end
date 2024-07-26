import React, { useEffect, useRef } from "react";
import { useCase } from "../../context/CaseContext";
import Utils from "../../utils";
import Table from "../../components/Table/Table";
import Styles from "./styles/case.module.css";
import { ICON } from "../../utils/icon";
import Card from "./components/Card";
import CaseCountChart from "../../components/CaseCountChart";

const Case = () => {
  const { caseList, fetchCaseList } = useCase();

  useEffect(() => {
    fetchCaseList();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "new":
        return "badge-violet";
      case "inprogress":
        return "badge-green";
      case "onhold":
        return "badge-orange";
      case "closed":
        return "badge-red";
    }
  };

  const getSeverity = (severity) => {
    switch (severity) {
      case 1:
        return "critical";
      case 2:
        return "high";
      case 3:
        return "medium";
      case 4:
        return "low";
      default: 
        return "NA"
    }
  }

  function getTableData(data) {
    return {
      ...Utils.GetTableData(),
      title: "All Cases",
      rows: data?.result?.map((item, index) => {
        const row = {
          Id: { key: "id", value: item.id, type: "hidden" },
          "S.No.": {
            key: "S.No.",
            value: index + 1,
            removeFromAutoSuggestion: true,
          },
          "Case ID": {
            key: "id",
            value: item.id,
          },
          Title: {
            key: "title",
            value: Utils.capitalizeEachWord(item.title),
          },
          "Created At": {
            key: "createdAt",
            value: Utils.getFormatedDate(item.createdAt),
          },
          "Updated At": {
            key: "updatedAt",
            value: Utils.getFormatedDate(item.updatedAt),
          },
        };

        const severity = getSeverity(item.severity);
        const severityClass = `badge-${severity}`;
        row["Severity"] = {
          key: "severity",
          value: (
            <span className={severityClass}>
              {Utils.capitalizeEachWord(severity)}
            </span>
          ),
          originalValue: severity,
        };

        const statusClass = `${getStatusBadgeClass(item.caseStateName)}`;
        row["Case State"] = {
          key: "caseStateName",
          value: (
            <span className={statusClass}>
              {Utils.capitalizeEachWord(item.caseStateName)}
            </span>
          ),
          originalValue: item.caseStateName,
        };

        return row;
      }),
      actionData: [
        {
          name: "Open",
          functions: (index) => {
            // handleEditNotice(index, data);
          },
          label: "Open",
          Id: "Id",
        },
        {
          name: "delete",
          functions: (index) => {
            // deleteNotice(index, data);
          },
          label: "Remove",
          Id: "Id",
        },
        {
          name: "Alert",
          functions: (index) => {
            // deleteNotice(index, data);
          },
          label: "Open Alerts",
          Id: "Id",
        },
        {
          name: "Close",
          functions: (index) => {
            // deleteNotice(index, data);
          },
          label: "Close",
          Id: "Id",
        },
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
      getTableData: getTableData,
    };
  }

  const tableData = React.useMemo(() => getTableData(caseList), [caseList]);

  return (
    <div>
      <div className={Styles.main_container}>
        <div className={Styles.case_overview_container}>
          <Card label="Without Case Id Alerts" count={20} icon={ICON.ALERT} />
          <Card label="Pending Cases" count={150} icon={ICON.PENDING} />
          <Card label="Closed" count={60} icon={ICON.CLOSED} />
          <Card label="Pending Cases" count={150} icon={ICON.PENDING} />
        </div>
        <div className={Styles.case_chart_container} >
          <div>
            <CaseCountChart/>
          </div>
          <div>
            <CaseCountChart/>
          </div>
        </div>
      </div>
      <div style={{marginTop:"1rem"}}>
        <Table tableData={tableData} />
      </div>
    </div>
  );
};

export default Case;
