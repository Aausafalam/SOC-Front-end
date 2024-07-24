import React from 'react'
import styles from "./index.module.css"
import {data} from "./index.js"
import { useNavigate } from 'react-router'
import { ReactSVG } from 'react-svg';

const Sidebar = () => {
    const navigate = useNavigate()
  return (<div className={styles.container}>
       <ul>
       { 
         data.map((item) => (
            <li onClick={() => {navigate(item.url)}}>
            <ReactSVG src={item.icon} className="icon" />
            <p>{item.name}</p>
            <div className={styles.underline}></div>
        </li>
         ))
       }
       </ul>
  </div>
  )
}

export default Sidebar