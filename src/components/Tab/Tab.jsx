import React, { useEffect, useRef, useState } from 'react';
import './Tab.css';
import { useNavigate } from 'react-router';

const Tab = ({ tabs, initialTab, onTabChange, baseUrl=null }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const tabLabelsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = (event) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        tabLabelsRef.current.scrollLeft += event.deltaY;
      }
    };

    const tabLabelsElement = tabLabelsRef.current;
    tabLabelsElement.addEventListener('wheel', handleScroll);

    return () => {
      tabLabelsElement.removeEventListener('wheel', handleScroll);
    };
  }, []);

  const handleTabClick = (index, tab) => {
    if (tab?.tabUrl) {
      navigate(`${baseUrl}/${tab.tabUrl}`);
    }
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className='tab_wrapper'>
      <div className="tab_labels" ref={tabLabelsRef}>
        {tabs.map((tab, index) => (
          <h3
            key={index}
            onClick={() => handleTabClick(index, tab)}
            style={{ borderBottom: activeTab === index ? "1px solid white" : "" }}
            className={activeTab === index ? 'active' : ''}
          >
            {tab.label}
          </h3>
        ))}
      </div>
      <div className="tab_content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tab;
