
import React, { useState } from "react";
import Styles from "../styles/case.module.css";
import Utils from "../../../utils";
import { ICON } from "../../../utils/icon";

const RelatedAlerts = ({data}) => {
  const [expanded, setExpanded] = useState(null);

  const handleToggle = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    if (typeof value === "object" && value !== null) {
      // Convert object to a string representation
      return Object.entries(value)
        .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
        .join("; ");
    }
    return value;
  };

  return (
    <div className={Styles.container}>
      { data && data?.alerts?.length>0 ?  data?.alerts?.map((alert) => (
        <div key={alert.id} className={Styles.alertContainer}>
          <button
            className={Styles.accordionButton}
            onClick={() => handleToggle(alert.id)}
            aria-expanded={expanded === alert.id}
          >
            <span>Alert ID: {alert.id}</span>
            <span className={Styles.icon}>
              {expanded === alert.id ? ICON.CHEVRON_UP : ICON.CHEVRON_DOWN}
            </span>
          </button>
          <div
            className={`${Styles.accordionContent} ${
              expanded === alert.id ? Styles.show : ""
            }`}
          >
            {
                Utils.renderJson(alert) 
            }
          </div>
        </div>
      )) : 
      (
        <div style={{textAlign:"center"}}>
          <img src="empty.png" style={{width:"50%"}}/>
          <p style={{textAlign:"center", paddingBottom:"3rem"}}>No Alerts Data Available.</p>
        </div>
      )
    }
    </div>
  );
};

export default RelatedAlerts;
