import React from 'react'
import styles from "./index.module.css"
import Sidebar from './Sidebar/index.jsx'
import NavBar from './Navbar/index.jsx'

const Layout = ({children}) => {
  return (<div className={styles.container}>
       <NavBar/>
     <div>
       <Sidebar/>
       <div className={styles.content}>
          {children}
       </div> 
     </div>
  </div>
  )
}

export default Layout