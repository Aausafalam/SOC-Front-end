import React, { memo, useEffect } from "react";
import Tab from "../../../components/Tab/Tab";
import CaseForm from "./CaseForm";
import RelatedAlerts from "./RelatedAlerts";
import { useCase } from "../../../context/CaseContext";

const CaseTabForm = ({ data, onSuccess, onCancel }) => {
  const {caseDetail, fetchCaseDetail} = useCase();

  useEffect(()=>{
    if(data?.id){
      fetchCaseDetail(data?.id);
    }
  },[data]);

  console.log("====",caseDetail);

  const tabs = React.useMemo(() => [
    { label: "Edit Case", content: <CaseForm data={caseDetail} onSuccess={onSuccess} onCancel={onCancel} /> },
    { label: "Related Alerts", content: <RelatedAlerts data={caseDetail} /> }
  ], [data, onSuccess, onCancel]);

  return (
    <div className="tabs">
      <Tab tabs={tabs} initialTab={0} />
    </div>
  );
};

export default memo(CaseTabForm);
