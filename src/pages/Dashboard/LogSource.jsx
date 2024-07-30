import React from 'react';
import Style from './Main.module.css';  // Import CSS module
import Utils from '../../utils';

const LogSource = ({ expandedData }) => {
  return (
    <div className={Style.log_source}>
      <div className={Style.log_first_child}>
        <h3>Log Source</h3>
        <ul>
          <li><a href="#">All</a></li>
          <li><a href="#">Network</a></li>
          <li><a href="#">EndPoints</a></li>
        </ul>
      </div>


      <div className={Style.log_second_child}>
        {expandedData  ? (
          <>
            <h3>Expanded Data</h3>
            {/* <p><strong>Index:</strong> {expandedData.index}</p> */}
            {
              Utils.renderJson(expandedData)
            }
            
          </>
        ) : (
          <p>Select an Log to Expand details.</p>
        )}
      </div>
    </div>
  );
};

export default LogSource;
