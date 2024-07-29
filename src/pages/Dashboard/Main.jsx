import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import LogSource from './LogSource';
import HistogramChart from './HistogramChart';
import TimeFrameSelector from './TimeFrameSelector';
import { parseISO, isWithinInterval, subDays, formatISO } from 'date-fns';
import Style from './Main.module.css'; // Import CSS module

const sampleHistogramData = [
  { time: '10:00', count: 15 },
  { time: '11:00', count: 30 },
  { time: '12:00', count: 9 },
  // ...more sample data
];

const Main = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [query, setQuery] = useState('');
  const [timeFrame, setTimeFrame] = useState('24h');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedData, setExpandedData] = useState(null); // State for expanded data
  const [histogramData, setHistogramData] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, [timeFrame]);

  useEffect(() => {
    if (filteredLogs.length > 0) {
      setExpandedData(filteredLogs[0]); // Set default expanded data
    }
  }, [filteredLogs]);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);

    const endTime = new Date();
    let startTime;

    if (typeof timeFrame === 'string') {
      switch (timeFrame) {
        case '1h':
          startTime = subDays(endTime, 0);
          break;
        case '24h':
          startTime = subDays(endTime, 1);
          break;
        case '7d':
          startTime = subDays(endTime, 7);
          break;
        case '30d':
          startTime = subDays(endTime, 30);
          break;
        default:
          startTime = new Date(0);
      }
    } else {
      const { start, end, startTime: sTime, endTime: eTime } = timeFrame;
      startTime = new Date(`${start}T${sTime}`);
      endTime = new Date(`${end}T${eTime}`);
    }

    const startISO = formatISO(startTime);
    const endISO = formatISO(endTime);
    const url = `http://192.168.42.39:3000/pagedEvents?page=1&start_time=2024-07-27T12:44:00Z&end_time=2024-07-27T13:44:00Z`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data); // Debugging line
      setLogs(data[0][0]?.hits.hits); // Adjust based on actual API response structure
      filterLogs(query, data[0][0]?.hits.hits);

      // console.log("asdlfkjasl", data[0][2])
      const histogramData = Object.entries(data[0][2]).map(([key, value]) => ({
        time: new Date(key).toLocaleTimeString(), // Format as desired
        count: value
      }));
      console.log(">=================", histogramData)
      setHistogramData(histogramData);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setQuery(query);
    filterLogs(query, logs);
  };

  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  const filterLogs = (query, logs) => {
    const filtered = logs.filter(log =>
      log?._source?.log?.message?.toLowerCase().includes(query.toLowerCase()) &&
      isWithinTimeFrame(log?._source['@timestamp'], timeFrame)
    );
    setFilteredLogs(logs);
  };

  const isWithinTimeFrame = (logTime, timeFrame) => {
    const now = new Date();
    let startTime;

    if (typeof timeFrame === 'string') {
      switch (timeFrame) {
        case '1h':
          startTime = subDays(now, 0);
          break;
        case '24h':
          startTime = subDays(now, 1);
          break;
        case '7d':
          startTime = subDays(now, 7);
          break;
        case '30d':
          startTime = subDays(now, 30);
          break;
        default:
          startTime = new Date(0);
      }
    } else {
      startTime = new Date(`${timeFrame.start}T${timeFrame.startTime}`);
      now = new Date(`${timeFrame.end}T${timeFrame.endTime}`);
    }
    const logDate = parseISO(logTime);
    return isWithinInterval(logDate, { start: startTime, end: now });
  };

  return (
    <div className={Style.Main}>
      <div className={Style.first_main_box}>
        <div className={Style.top_section}>
          <SearchBar onSearch={handleSearch} />
          <TimeFrameSelector onChange={handleTimeFrameChange} />
        </div>
        <div className={Style.histogram_main_data}>
          <HistogramChart data={histogramData} />
          <div className={Style.Data_display}>
          <MainDataDisplay data={filteredLogs} onExpand={setExpandedData} />
          </div>
        </div>
      </div>

      <div className={Style.content}>
     
        <div className={Style.log_node_type}>
          <LogSource logs={filteredLogs} expandedData={expandedData} />
        </div>
      </div>
    </div>
  );

};

const MainDataDisplay = ({ data, onExpand }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={Style.main_data}>
      <h3>Query Count: {data.length}</h3>
      <div className={Style.data_list}>
        {currentItems.map((item) => {
          const log = item._source || {};

          return (
            <div key={item._id} className={Style.data_item}>

              <span><strong>ID:</strong> {log?.id_copy}</span>
              <span><strong>Agent Name:</strong> {log.agent?.name}</span>
              <span><strong>Agent id:</strong> {log.agent?.id}</span>
              <span><strong>Agent ephemeral_id:</strong> {log.agent?.ephemeral_id}</span>
              <span><strong>Agent version:</strong> {log.agent?.version}</span>
              {/* <span><strong>File Path:</strong> {log.log?.file?.path || 'No file path'}</span> */}
              {/* <span><strong>Offset:</strong> {log.log?.offset || 'No offset'}</span> */}

              {/* 
              <span><strong>File Path:</strong> {log.log?.file?.path || 'No file path'}</span>
              <span><strong>Offset:</strong> {log.log?.offset || 'No offset'}</span>
              <span><strong>@metadata:Pipeline</strong> {log['@metadata']?.pipeline || 'No Pipeline'}</span>
              <span><strong>@metadata:Beat</strong> {log['@metadata']?.beat || 'No beat'}</span>
              <span><strong>@metadata:type</strong> {log['@metadata']?.type || 'No type'}</span>
              <span><strong>@metadata:version</strong> {log['@metadata']?.version || 'No version'}</span>

              <span><strong>Tags:</strong> {log.log?.tags?.join(', ') || 'No tags'}</span> */}
              {/* <span><strong>Timestamp:</strong> {log['@timestamp'] || 'No timestamp'}</span>
              <span><strong>Event Created:</strong> {log.event?.created || 'No event created'}</span>
              <span><strong>Source Address:</strong> {log.source?.address || 'No source address'}</span>
              <span><strong>Source Port:</strong> {log.source?.port || 'No source port'}</span>
              <span><strong>Source Ip:</strong> {log.source?.ip || 'No source ip'}</span>
              <span><strong>Destination Address:</strong> {log.destination?.address || 'No destination address'}</span>
              <span><strong>Transport:</strong> {log.network?.transport || 'No transport'}</span> */}
              {/* <span><strong>Community ID:</strong> {log.network?.community_id || 'No community ID'}</span> */}
              <button
                onClick={() => onExpand(log)}
                className={Style.expand_button}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="m10 14l-8 8m-1-7v8h8M22 2l-8 8m1-9h8v8" /></svg>
              </button>
            </div>
          );
        })}
      </div>
      <div className={Style.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={Style.page_button}
        >
          Previous
        </button>
        <span className={Style.page_info}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={Style.page_button}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Main;
