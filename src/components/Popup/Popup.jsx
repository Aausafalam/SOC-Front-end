import React from 'react';
import './Popup.css';

const Popup = ({ show, onClose, title, children, width, style }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ ...style, maxWidth: width, maxHeight:"90vh", overflow:"auto" }}>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <span className="modal-close-icon" onClick={onClose} aria-label="Close">
            &times;
          </span>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
      <div className="modal-backdrop"></div>
    </div>
  );
};

export default Popup;
