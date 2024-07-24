// Box.js
import React from 'react';
import './Box.css';

const Box = ({ label, count }) => {
  const getColor = () => {
    if (count > 100) return '#FF6347';
    if (count > 50) return '#FFD700';
    return '#32CD32';
  };

  return (
    <div className="box" style={{ backgroundColor: getColor() }}>
      <div className="box-count">{count}</div>
      <div className="box-label">{label}</div>
    </div>
  );
};

export default Box;
