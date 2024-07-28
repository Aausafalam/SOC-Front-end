import { useEffect } from "react";
import { useCase } from "../../../context/CaseContext";
import { ICON } from "../../../utils/icon";
import Styles from "../styles/case.module.css";
import Card from "./Card";

const CaseStatsCards = () => {
    const {caseMatrixData, fetchCaseMatricesData} = useCase();

    useEffect(()=>{
        fetchCaseMatricesData();
    },[]);

    // const caseMatrixCounts = {
    //     withoutCaseIdAlerts:{
    //         count:0,
    //         percentageChangeWeek:null,
    //         percentageChangeMonth:null,
    //     },
    //     pendingCases:{
    //         count:4,
    //         percentageChangeWeek:-5,
    //         percentageChangeMonth:6,
    //     },
    //     closedCases:{
    //         count:1,
    //         percentageChangeWeek:15,
    //         percentageChangeMonth:-8,
    //     }
    // };

    return (
        <div className={Styles.case_overview_container}>
            {
                caseMatrixData ? (
                    <>
                    <Card 
                            label="Without Case Id Alerts" 
                            count={caseMatrixData?.withoutCaseIdAlerts?.count} 
                            percentageChangeWeek={caseMatrixData?.withoutCaseIdAlerts?.percentageChangeWeek} 
                            percentageChangeMonth={caseMatrixData?.withoutCaseIdAlerts?.percentageChangeMonth} 
                            icon={ICON.ALERT}
                        />
                        <Card 
                            label="Pending Cases" 
                            count={caseMatrixData?.pendingCases?.count} 
                            percentageChangeWeek={caseMatrixData?.pendingCases?.percentageChangeWeek} 
                            percentageChangeMonth={caseMatrixData?.pendingCases?.percentageChangeMonth} 
                            icon={ICON.PENDING}
                        />
                        <Card 
                            label="Closed Cases" 
                            count={caseMatrixData?.closedCases?.count} 
                            percentageChangeWeek={caseMatrixData?.closedCases?.percentageChangeWeek} 
                            percentageChangeMonth={caseMatrixData?.closedCases?.percentageChangeMonth} 
                            icon={ICON.CLOSED}
                        />
                    </>
                ) : <p>Loading....</p>
            }
            
        </div>
        )
}

export default CaseStatsCards;