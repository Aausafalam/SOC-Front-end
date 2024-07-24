import React from 'react';
import './Box.css';

const Box = ({ label, count, icon }) => {
  return (
    <div className="box">
      <span class="box-icon">{icon}</span>
      <div class="box-content">
            <span class="box-label">{label}</span>
            <span class="box-count">{count}</span>
      </div>
    </div>
  );
};

export default Box;