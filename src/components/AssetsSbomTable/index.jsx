import React, { useEffect } from 'react'
import styles from "./index.module.css"
import Utils from "../../utils";
import { useAssets } from '../../context/AssetsContext';
import Table from '../Table/Table';
const AssetsSbomTable = () => { 



    const {assetsList, fetchAssetsList,assetsSbomList,fetchAssetsSbomList} = useAssets();
    
    useEffect(()=>{
          fetchAssetsSbomList();
    },[]);

    function getTableData(data) {
        return {
          ...Utils.GetTableData(),
          title: `SBOM Table ${"( 150 )"}`,
          rows: data.data?.map((item, index) => {
            const row = {
              Id: { key: "_id", value: item._id, type: "hidden" },
              "S.No.": {
                key: "S.No.",
                value: index + 1,
                removeFromAutoSuggestion: true,
              },
              "Agent Id": {
                key: "agentId",
                value: item.agentId,
              },
              "Value": {
                key: "value",
                value: item.value,
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
          searchUrl: "/assetsTable.json",
          exportDataUrl: "/assetsTable.json",
          printUrl: "/assetsTable.json",
          paginationUrl: "/assetsTable.json",
          totalPage: data?.totalPages,
          totalItemCount: data?.totalItems,
          autoSuggestionUrl: "/assetsTable.json",
          initialSort: "inventoryId",
          // intialLimit:14,
          getTableData: getTableData,
        };
      }

  

      const tableData = React.useMemo(() => getTableData(assetsSbomList), [assetsSbomList]);

  return ( <div className={styles.container}>
 <Table tableData={tableData} />
  </div>
  )
}

export default AssetsSbomTable