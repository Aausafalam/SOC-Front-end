import React, { useEffect } from 'react';
import styles from "./index.module.css";
import { useTheme } from '../../context/ThemeContext';
import { ICON } from '../../utils/icon';

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={styles.container}>
      <img src="./assets/companyLogo.png" alt="Company Logo" />
      <nav>
        <ul>
          <li className={styles.themeSwitcher}>
            <button onClick={toggleTheme} aria-label="Switch Theme">
              {theme === 'light' ? ICON.LIGHT : ICON.DARK}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
