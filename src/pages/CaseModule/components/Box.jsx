import React, { useEffect, useRef } from "react";
import Style from "./Box.module.css";
import { ICON } from "../../../utils/icon";
import Dropdown from "../../../components/DropDown/Dropdown";

const Box = ({ label, count, icon }) => {
  

  const actions = [
    {
      name: "refresh",
      functions: () => {},
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
                  onClick={() => action.functions()}
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
            <span className={Style.increase}>+ 18.2% {ICON.ARROW_UP}</span>
            <span className={Style.footerText}>than last week</span>
          </div>
          <div className={Style.footerItem}>
            <span className={Style.decrease}>- 15% {ICON.ARROW_DOWN}</span>
            <span className={Style.footerText}>than last month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
