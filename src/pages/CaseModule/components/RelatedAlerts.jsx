import React from "react";
import Styles from "../styles/case.module.css";

const RelatedAlerts = () => {
  const alertData = Array.from({ length: 10 }, (_, i) => ({
    key: `key${i}`,
    value: `value${i}`
  }));

  return (
    <div className={`table-container ${Styles.alert_details_view}`} style={{ padding: "0px" }}>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {alertData.map(({ key, value }) => (
            <tr key={key}>
              <td>{key}</td>
              <td style={{ color: "#F48634" }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RelatedAlerts;
