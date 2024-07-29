// TimeFrameSelector.js
import React, { useState } from 'react';
import Style from './Main.module.css'; // Import CSS module

const TimeFrameSelector = ({ onChange }) => {
  const [timeFrame, setTimeFrame] = useState('24h');
  const [customRange, setCustomRange] = useState({ start: '', end: '', startTime: '', endTime: '' });

  const handleTimeFrameChange = (e) => {
    const value = e.target.value;
    setTimeFrame(value);
    if (value !== 'custom') {
      onChange(value);
    }
  };

  const handleCustomRangeChange = (field, value) => {
    setCustomRange(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomRangeSubmit = () => {
    onChange(customRange);
  };

  return (
    <div className={Style.time_frame_selector}>
      <select onChange={handleTimeFrameChange} value={timeFrame} className={Style.time_frame_select}>
        <option value="1h">Last 1 hour</option>
        <option value="24h">Last 24 hours</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="custom">Custom Range</option>
      </select>
      {timeFrame === 'custom' && (
        <div className={Style.custom_range_container}>
          <input
            type="date"
            onChange={(e) => handleCustomRangeChange('start', e.target.value)}
            className={Style.custom_date_input}
          />
          <input
            type="time"
            onChange={(e) => handleCustomRangeChange('startTime', e.target.value)}
            className={Style.custom_time_input}
          />
          <input
            type="date"
            onChange={(e) => handleCustomRangeChange('end', e.target.value)}
            className={Style.custom_date_input}
          />
          <input
            type="time"
            onChange={(e) => handleCustomRangeChange('endTime', e.target.value)}
            className={Style.custom_time_input}
          />
          <button onClick={handleCustomRangeSubmit} className={Style.custom_range_button}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default TimeFrameSelector;
// 