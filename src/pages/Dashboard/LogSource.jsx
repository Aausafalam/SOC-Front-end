import React from 'react';
import Style from './Main.module.css';  // Import CSS module

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
        {expandedData ? (
          <>
            <h3>Expanded Data</h3>
            <p><strong>ID:</strong> {expandedData.id_copy}</p>
            <p><strong>Address</strong> {expandedData.source?.address || 'No Address'}</p>
            <p><strong>Port</strong> {expandedData.source?.port || 'No Post'}</p>
            {/* <p><strong>IP</strong> {expandedData.source?.ip || 'No IP'}</p> */}

            <p><strong>File Path:</strong> {expandedData.log?.file?.path || 'No file path'}</p>
            <p><strong>Offset:</strong> {expandedData.log?.offset || 'No offset'}</p>
            <p><strong>Tags:</strong> {expandedData.log?.tags?.join(', ') || 'No tags'}</p>
            <p><strong>Events Created:</strong> {expandedData.event?.created || 'No Events'}</p>
            <p><strong>Service:</strong> {expandedData.service?.type || 'No Service'}</p>
            <p><strong>ESC:</strong> {expandedData.esc?.version || 'No ESC'}</p>
            <p><strong>HOST:</strong> {expandedData.host?.name || 'No HOST'}</p>



            <p><strong>Timestamp:</strong> {expandedData['@timestamp'] || 'No timestamp'}</p>
          </>
        ) : (
          <p>Select an Log to Expand details.</p>
        )}
      </div>
    </div>
  );
};

export default LogSource;
