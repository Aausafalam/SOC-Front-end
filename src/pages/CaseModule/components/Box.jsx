import React from 'react';
import Style from './Box.module.css';
import { ICON } from '../../../utils/icon';

const Box = ({ label, count, icon }) => {
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
            {ICON.DOT_MENU}
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
