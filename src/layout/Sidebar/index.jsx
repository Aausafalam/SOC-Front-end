import React from 'react'
import styles from "./index.module.css"
import {data} from "./index.js"
import { useLocation, useNavigate } from 'react-router'
import { ReactSVG } from 'react-svg';

const Sidebar = () => {
    const navigate = useNavigate()
   const location = useLocation()

   console.log(location.pathname)
   const path = location.pathname
  return (<div className={styles.container}>
       <ul>
       { 
         data.map((item) => (
            <li className={path.toString() === item.url && styles.active} onClick={() => {navigate(item.url)}}>
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