import React from 'react'
import styles from "./index.module.css";

const Card = ({data}) => {
  


  return (<div className={styles.container}>
     <h2> <span style={{background:data.color}}></span> {data.name}</h2>
     <h1>{data.count}</h1>
  </div>
   
  )
}

export default Card