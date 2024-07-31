/* eslint-disable jsx-a11y/anchor-is-valid */
// import React from 'react';
// import Style from './Main.module.css';  // Import CSS module
// import Utils from '../../utils';

// const LogSource = ({ expandedData }) => {
//   return (
//     <div className={Style.log_source}>
//       <div className={Style.log_first_child}>
//   <h3>Log Source</h3>
//   <ul>
//     <li><a href="#" onClick={() => handleTabClick('All')}>All</a></li>
//     <li><a href="#" onClick={() => handleTabClick('Network')}>Network</a></li>
//     <li><a href="#" onClick={() => handleTabClick('EndPoints')}>EndPoints</a></li>
//   </ul>
// </div>

//       <div className={Style.log_second_child}>
//         {expandedData  ? (
//           <>
//             <h3>Expanded Data</h3>
//             {/* <p><strong>Index:</strong> {expandedData.index}</p> */}
//             {
//               Utils.renderJson(expandedData)
//             }

//           </>
//         ) : (
//           <p>Select an Log to Expand details.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LogSource;


import React, { useState } from 'react';
import Style from './Main.module.css';
import Utils from '../../utils';

const LogSource = ({ expandedData, handleTabClick }) => {
  const [selectedTab, setSelectedTab] = useState('All');

  const onTabClick = (category) => {
    setSelectedTab(category);
    handleTabClick(category);
  };

  return (
    <div className={Style.log_source}>
      <div className={Style.log_first_child}>
        <h3>Log Source</h3>
        <ul>
          <li><button className={selectedTab === 'All' ? Style.active : ''} onClick={() => onTabClick('All')}>All</button></li>
          <li><button className={selectedTab === 'Network' ? Style.active : ''} onClick={() => onTabClick('Network')}>Network</button></li>
          <li><button className={selectedTab === 'EndPoints' ? Style.active : ''} onClick={() => onTabClick('EndPoints')}>EndPoints</button></li>
        </ul>
      </div>
      <div className={Style.log_second_child}>
        {expandedData ? (
          <>
            <h3>Expanded Data</h3>
            {Utils.renderJson(expandedData)}
          </>
        ) : (
          <p>Select a log to expand details.</p>
        )}
      </div>
    </div>
  );
};

export default LogSource;
