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
        {expandedData  ? (
          <>
            <h3>Expanded Data</h3>
            {/* <p><strong>Index:</strong> {expandedData.index}</p> */}

            <p><strong>ID:</strong> {expandedData?.id_copy || 'No ID'}</p>
            <p><strong>Agent Name:</strong> {expandedData.agent?.name || 'No Agent Name'}</p>
            <p><strong>Agent ID:</strong> {expandedData.agent?.id || 'No Agent ID'}</p>
            <p><strong>Agent Ephemeral ID:</strong> {expandedData.agent?.ephemeral_id || 'No Ephemeral ID'}</p>
            <p><strong>Agent Version:</strong> {expandedData.agent?.version || 'No Agent Version'}</p>
            <p><strong>File Path:</strong> {expandedData.log?.file?.path || 'No file path'}</p>
            <p><strong>Offset:</strong> {expandedData.log?.offset || 'No offset'}</p>
            <p><strong>@metadata:Pipeline</strong> {expandedData['@metadata']?.pipeline || 'No Pipeline'}</p>
            <p><strong>@metadata:Beat</strong> {expandedData['@metadata']?.beat || 'No beat'}</p>
            <p><strong>@metadata:Type</strong> {expandedData['@metadata']?.type || 'No type'}</p>
            <p><strong>@metadata:Version</strong> {expandedData['@metadata']?.version || 'No version'}</p>
            <p><strong>Tags:</strong> {expandedData.log?.tags?.join(', ') || 'No tags'}</p>
            <p><strong>Timestamp:</strong> {expandedData['@timestamp'] || 'No timestamp'}</p>
            <p><strong>Event Created:</strong> {expandedData.event?.created || 'No event created'}</p>
            <p><strong>Source Address:</strong> {expandedData.source?.address || 'No source address'}</p>
            <p><strong>Source Port:</strong> {expandedData.source?.port || 'No source port'}</p>
            <p><strong>Source IP:</strong> {expandedData.source?.ip || 'No source IP'}</p>
            <p><strong>Destination Address:</strong> {expandedData.destination?.address || 'No destination address'}</p>
            <p><strong>Transport:</strong> {expandedData.network?.transport || 'No transport'}</p>
            <p><strong>Community ID:</strong> {expandedData.network?.community_id || 'No community ID'}</p>
            <p><strong>Service Type:</strong> {expandedData.service?.type || 'No Service Type'}</p>
            <p><strong>ESC Version:</strong> {expandedData.esc?.version || 'No ESC Version'}</p>
            <p><strong>Host Name:</strong> {expandedData.host?.name || 'No Host Name'}</p>
            {/* <span><strong>Community ID:</strong> {expandedData.network?.community_id || 'No community ID'}</span> */}
          </>
        ) : (
          <p>Select an Log to Expand details.</p>
        )}
      </div>
    </div>
  );
};

export default LogSource;
