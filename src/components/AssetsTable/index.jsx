import React, { useEffect } from 'react'
import styles from "./index.module.css"
import Utils from "../../utils";
import { useAssets } from '../../context/AssetsContext';
import Table from '../Table/Table';
const AsstesTable = () => { 



    const {assetsList, fetchAssetsList} = useAssets();
    
    useEffect(()=>{
         fetchAssetsList();
    },[]);

    function getTableData(data) {

        console.log(data)
        return {
          ...Utils.GetTableData(),
          title: "Assets Table",
          rows: data?.data?.map((item, index) => {
            const row = {
              Id: { key: "_id", value: item._id, type: "hidden" },
              "S.No.": {
                key: "S.No.",
                value: index + 1,
                removeFromAutoSuggestion: true,
              },
              "Assets Id": {
                key: "inventoryId",
                value: item.inventoryId,
              },
              "Asset Type": {
                key: "assetTypeName",
                value: Utils.capitalizeEachWord(item.assetTypeName),
              },
              "Custodian Name": {
                key: "custodianName",
                value: Utils.capitalizeEachWord(item.custodianName),
              },
              "Asset Status": {
                key: "statusName",
                value: Utils.capitalizeEachWord(item.statusName),
              },
              "Is Vulnerable": {
                key: "isVulnerable",
                value: item.isVulnerable || "No",
              },
              "Is Verified": {
                key: "isVerified",
                value: item.isVerified || "No",
              },

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
          searchUrl: "/assetsTable.json",
          exportDataUrl: "/assetsTable.json",
          printUrl: "/assetsTable.json",
          paginationUrl: "https://backend.assets.k8.c3ihub/assetList?page=input&limit=count",
          totalPage: data?.pagination?.totalPages,
          totalItemCount: data?.pagination?.totalItems,
          // autoSuggestionUrl: "/assetsTable.json",
          initialSort: "inventoryId",
          getTableData: getTableData,
        };
      }

  

      const tableData = React.useMemo(() => getTableData(assetsList), [assetsList]);

  return ( <div className={styles.container}>
 <Table tableData={tableData} />
  </div>
  )
}

export default AsstesTable