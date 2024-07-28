import React, { memo } from "react";
import Tab from "../../../components/Tab/Tab";
import CaseForm from "./CaseForm";
import RelatedAlerts from "./RelatedAlerts";

const CaseTabForm = ({ data, onSuccess, onCancel }) => {
  const tabs = React.useMemo(() => [
    { label: "Edit Case", content: <CaseForm data={data} onSuccess={onSuccess} onCancel={onCancel} /> },
    { label: "Related Alerts", content: <RelatedAlerts /> }
  ], [data, onSuccess, onCancel]);

  return (
    <div className="tabs">
      <Tab tabs={tabs} initialTab={0} />
    </div>
  );
};

export default memo(CaseTabForm);
