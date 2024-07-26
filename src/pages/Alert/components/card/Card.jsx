import React from "react";
import Style from "./card.module.css";
import { ICON } from "../../../../utils/icon";
import Dropdown from "../../../../components/DropDown/Dropdown";

const Card = ({label, count = 0, icon, percentageChangeWeek = 0, percentageChangeMonth = 0}) => {
  const formatPercentage = (value) => {
    if(!value){
      return `${0}%`;
    }
    return value >= 0 ? `+${value}%` : `${value}%`;
  };

  const weekArrow = percentageChangeWeek >= 0 ? ICON.ARROW_UP : ICON.ARROW_DOWN;
  const monthArrow = percentageChangeMonth >= 0 ? ICON.ARROW_UP : ICON.ARROW_DOWN;

  const actions = [
    {
      name: "refresh",
      functions: () => {
        // Implement refresh logic here
      },
      label: "Refresh",
    },
  ];

  return (
    <div className={Style.box}>
      <div className={Style.vCardText}>
        <div className={Style.header}>
          <div className={Style.vavatar}>
            <span>{icon}</span>
            <span className={Style.vAvatarUnderlay}></span>
          </div>
          <div className={Style.textContainer}>
            <h4 className={Style.boxCount}>{count}</h4>
            <div className={Style.boxLabel}>{label}</div>
          </div>
          <span className={Style.dotMenu}>
            <Dropdown
              trigger={<span>{ICON.DOT_MENU}</span>}
              content={actions.map((action, index) => (
                <p
                  key={index}
                  onClick={action.functions}
                  className=""
                  title={action.label}
                >
                  {ICON[action.name.toUpperCase()]} {action.label}
                </p>
              ))}
            />
          </span>
        </div>

        <div className={Style.footer}>
          <div className={Style.footerItem}>
            <span className={Style.increase}>
              {formatPercentage(percentageChangeWeek)} {weekArrow}
            </span>
            <span className={Style.footerText}>than last week</span>
          </div>
          <div className={Style.footerItem}>
            <span className={Style.decrease}>
              {formatPercentage(percentageChangeMonth)} {monthArrow}
            </span>
            <span className={Style.footerText}>than last month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
