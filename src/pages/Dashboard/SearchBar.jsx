import React, { useState } from 'react';
import Style from './Main.module.css'; // Import CSS module

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className={Style.search_bar}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter KQL query"
        className={Style.search_input}
      />
      <button type="submit" className={Style.search_button}>Search</button>
    </form>
  );
};

export default SearchBar;
