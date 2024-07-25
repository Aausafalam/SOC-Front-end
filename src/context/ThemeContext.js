import React, { createContext, useState, useContext } from 'react';
import { constants } from '../utils/constants';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || constants.THEME.LIGHT);
  const toggleTheme = () => {
    const newTheme = theme === constants.THEME.LIGHT ? constants.THEME.DARK : constants.THEME.LIGHT;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);