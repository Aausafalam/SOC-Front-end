import React from 'react'
import styles from "./index.module.css"
import data from "./index.json"
import { useNavigate } from 'react-router'


const Sidebar = () => {
    const navigate = useNavigate()
  return (<div className={styles.container}>
       <ul>
       { 
         data.map((item) => (
            <li onClick={() => {navigate(item.url)}}>
            <img src={item.icon} alt="" />
            <p>{item.name}</p>
        </li>
         ))
       }
       </ul>
  </div>
  )
}

export default Sidebar