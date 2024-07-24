import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css';

const Dropdown = ({ trigger, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown">
      <div onClick={toggleDropdown} className="dropdown-trigger">
        {trigger}
      </div>
      {isOpen && (
        <div className="dropdown-content" ref={dropdownRef}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
