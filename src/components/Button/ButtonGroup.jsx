import React from 'react';
import "./ButtonGroup.css";

const ButtonGroup = ({ buttons, style=null }) => {
  return (
    <div className="button_group_container" style={style}>
      {buttons.map((button, index) => (
        <button
          key={index}
          type={button.type || 'button'}
          className={`${button.className}`}
          onClick={button.onClick}
        >
          {button.icon && <span className="button-icon">{button.icon}</span>}
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
