import React, { useEffect } from 'react'
import styles from "./index.module.css"
import Utils from "../../utils";
import { useAssets } from '../../context/AssetsContext';
import Table from '../Table/Table';
import data from "./sbomData.json"
const AssetsSbomTable = () => { 



    const {assetsList, fetchAssetsList,assetsSbomList,fetchAssetsSbomList} = useAssets();
      

     

   
    function getAgentPackageInfo(data) {
      return Object.keys(data).map(key => {
          const agent = data[key];
          return {
              agent_name: agent.agent_name,
              packageLength: agent.packages.length,
          };
      }).sort((a, b) => { return b.packageLength - a.packageLength});
  }
  


    useEffect(()=>{
          fetchAssetsSbomList();
    },[]);

    function getTableData(data) {

       //console.log("areqrewr",data)
       let count = 0 
      
      //  //console.log("qwrerewtrweT", data.map((data) => count += data.packageLength))
      data.forEach((item) => {
        count += item.packageLength
      })
      // //console.log("eqwrqeo",count)
        return {
          ...Utils.GetTableData(),
          title: `SBOM Table ( ${count} )`,
          rows: data?.map((item, index) => {
            const row = {
              Id: { key: "_id", value: item._id, type: "hidden" },
              "S.No.": {
                key: "S.No.",
                value: index + 1,
                removeFromAutoSuggestion: true,
              },
              "Agent Id": {
                key: "agentId",
                value: item.agent_name,
              },
              "Value": {
                key: "value",
                value: item.packageLength,
              }

            };
            return row;
          }),
        //   actionData: [
        //     {
        //       name: "Edit",
        //       functions: (index) => {
        //         // handleEditNotice(index, data);
        //       },
        //       label: "Edit",
        //       Id: "Id",
        //     },
        //     {
        //       name: "Delete",
        //       functions: (index) => {
        //         // deleteNotice(index, data);
        //       },
        //       label: "Delete",
        //       Id: "Id",
        //     },
        //   ],
        //    action: true,
          action:false,
          searchBar:false,
          export:false,
          print:false,
          reset:false,
          sorting:false,
          searchUrl: false,
          exportDataUrl: false,
          printUrl: false,
          paginationUrl: "/assetsTable.json",
          totalPage: data?.totalPages,
          totalItemCount: data?.totalItems,
          autoSuggestionUrl: "/assetsTable.json",
          initialSort: "inventoryId",
          // intialLimit:14,
          getTableData: getTableData,
        };
      }

  

      const tableData = React.useMemo(() => getTableData(getAgentPackageInfo(data)?.slice(0,13)), [data]);

  return ( <div className={styles.container}>
 <Table tableData={tableData} />
  </div>
  )
}

export default AssetsSbomTable