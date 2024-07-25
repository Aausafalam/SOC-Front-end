import React from 'react';
import Style from './Box.module.css';

const Box = ({ label, count, icon }) => {
  return (
    <div className={Style.box}>
      <span class={Style.boxIcon} >{icon}</span>
      <div class={Style.boxContent}>
            <span class={Style.boxLabel}>{label}</span>
            <span class={Style.boxCount}>{count}</span>
      </div>
    </div>
  );
};

export default Box;