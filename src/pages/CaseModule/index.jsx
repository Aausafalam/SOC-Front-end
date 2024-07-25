import React, { useEffect, useRef } from "react";
import { useCase } from "../../context/CaseContext";
import Utils from "../../utils";
import Table from "../../components/Table/Table";
import Box from "./components/Box";
import Styles from "./styles/case.module.css";
import { ICON } from "../../utils/icon";

const Case = () => {
    const {caseList, fetchCaseList} = useCase();

    useEffect(()=>{
        fetchCaseList();
    },[]);

    const getStatusBadgeClass = (status) => {
        switch(status.toLowerCase()){
            case "new": return "badge-violet"; 
            case "inprogress": return "badge-green";
            case "onhold": return "badge-orange";
            case "closed": return "badge-red";
        }
    }

    function getTableData(data) {
        return {
          ...Utils.GetTableData(),
          title: "All Cases",
          rows: data?.map((item, index) => {
            const row = {
              Id: { key: "_id", value: item._id, type: "hidden" },
              "S.No.": {
                key: "S.No.",
                value: index + 1,
                removeFromAutoSuggestion: true,
              },
              "Case ID": {
                key: "caseId",
                value: Utils.capitalizeEachWord(item.caseId),
              },
              Title: {
                key: "title",
                value: Utils.capitalizeEachWord(item.title),
              },
              "Start Date": {
                key: "startDate",
                value: Utils.getFormatedDate(item.startDate),
              },
              "Updated At": {
                key: "updatedAt",
                value: Utils.getFormatedDate(item.updatedAt),
              },
            };

            const severityClass = `badge-${item.severity.toLowerCase()}`;
            row["Severity"] = {
              key: "severity",
              value: (
                <span className={severityClass}>
                  {Utils.capitalizeEachWord(item.severity)}
                </span>
              ),
              originalValue:item.severity,
            };

            const statusClass = `${getStatusBadgeClass(item.status)}`;
            row["Status"] = {
              key: "status",
              value: (
                <span className={statusClass}>
                  {Utils.capitalizeEachWord(item.status)}
                </span>
              ),
              originalValue:item.status,
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
            <div className={Styles.case_overview_container}>
                <Box label="Without Case Id Alerts" count={20} icon={ICON.ALERT} />
                <Box label="Pending Cases" count={150} icon={ICON.PENDING} />
                <Box label="Closed" count={60} icon={ICON.CLOSED} />
                <Box label="Pending Cases" count={150} icon={ICON.PENDING} />
            </div>
            <Table tableData={tableData} />
           
        </div>
    );
}

export default Case;