import React from 'react'
import styles from "./index.module.css";
import { Line, Circle } from 'rc-progress';
import { ReactSVG } from 'react-svg';
const ProgressBar = ({data}) => {
    console.log(data)
  return (
    <div className={styles.container}>
        <div style={{background:data.icon ? data.strokeColor : ""}} className={styles.icon}>
            {
                <ReactSVG src={data.icon} className="icon" />
            }
        </div>
        <div>
            <p>
                <span>{data.title}</span>
                <span>{data.value}</span>
            </p>
               {
                data?.isPercentageShow ?
                <div className={styles.progress_bar}>
                     <Line strokeLinecap={"round"} percent={data.percentage} strokeWidth={3} trailWidth={2.5} strokeColor={data.strokeColor} />
                 
                     <p className={styles.pecentage}>{data.percentage} %</p>
                 
                </div> : 
                     <Line strokeLinecap={"round"} percent={data.percentage} strokeWidth={3} trailWidth={2.5} strokeColor={data.strokeColor} />

               }
                
             
        </div>

    </div>
  )
}

export default ProgressBar