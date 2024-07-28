import React, { useEffect, useState } from 'react'
import styles from "./index.module.css"
import { useConfiguration } from '../../context/AlertContext copy';
import Table from '../Table/Table';
import Utils from '../../utils';
import Popup from '../Popup/Popup';
import Card from './Card';

const ConfigurationTable = () => {

   
    const {configurationList, fetchConfigurationList} = useConfiguration();
    const [showPopUp,setShowPopUp] = useState(false)
    const [id,setId] = useState(null)
   
    const togglePopup = () => setShowPopUp(!showPopUp);

    useEffect(()=>{
        fetchConfigurationList();
   },[]);

  console.log(configurationList)
   
  function getTableData(data) {

    console.log(data)
    return {
      ...Utils.GetTableData(),
      title: "Configuration Table",
      rows: data?.data?.map((item, index) => {
        const row = {
          Id: { key: "id", value: item._id, type: "hidden" },
          "S.No.": {
            key: "S.No.",
            value: index + 1,
            removeFromAutoSuggestion: true,
          },
          "Name": {
            key: "inventoryId",
            value: item.inventoryId,
          },
          "Details_Name": {
            key: "assetTypeName",
            value: Utils.capitalizeEachWord(item.assetTypeName),
          },
          "Pass": {
            key: "custodianName",
            value: Utils.capitalizeEachWord(item.custodianName),
          },
          "Fail": {
            key: "statusName",
            value: Utils.capitalizeEachWord(item.statusName),
          },
          "Score": {
            key: "isVulnerable",
            value: item.isVulnerable || "No",
          }

        };
        return row;
      }),
      actionData: [
        {
          name: "View",
          functions: (index) => {
            setId(index);
            togglePopup()
          },
          label: "View Details",
          Id: "Id",
        }
      ],
       action: true,
      searchUrl: "/assetsTable.json",
      exportDataUrl: false,
      printUrl: false,
      paginationUrl: false,
      totalPage: data?.pagination?.totalPages,
      totalItemCount: data?.pagination?.totalItems,
      // autoSuggestionUrl: "/assetsTable.json",
      initialSort: "inventoryId",
      getTableData: getTableData,
    };
  } 



  const cardData = [
    {
      name:"Pass",
      count:"20",
      color:"#388e3c"
    },
    {
      name:"Fail",
      count:"50",
      color:"#eb032c"
    },
    {
      name:"Score",
      count:"40",
      color:"#6fcd9e"
    },
    {
      name:"last Scan",
      count:"28 july 2024",
      color:"#9460ff"
    }
  ]


  const tableData = React.useMemo(() => getTableData(configurationList), [configurationList]);
   
  return (<div className={styles.container}>
   
   <Table tableData={tableData} />
    
   <Popup  width="80%" show={showPopUp} onClose={togglePopup} title={`Show Details ( Id :  ${id} )`}>
     {/* <Table tableData={tableData} /> */}
       
       <div className={styles.card_container}>
       {
        cardData.map((item) => (
          <Card data={item}/>
        ))
       }
       </div>
       <div className={styles.policy_name}>
     <h2>{"Policy Name : "}</h2>
     <h1> Anti-discrimination and harassment policy</h1>
  </div>










       
     </Popup>


  </div>
  )
}

export default ConfigurationTable