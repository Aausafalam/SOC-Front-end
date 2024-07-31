import { useEffect } from "react";
import { useCase } from "../../../context/CaseContext";
import { ICON } from "../../../utils/icon";
import Styles from "../styles/case.module.css";
import Card from "./Card";

const CaseStatsCards = () => {
    const { caseMatrixData, fetchCaseMatricesData } = useCase();

    useEffect(() => {
        fetchCaseMatricesData();
    }, []);

    const safeParseInt = (value, fallback = 0) => {
        const parsed = parseInt(value, 10);
        return isNaN(parsed) ? fallback : parsed;
    };

    return (
        <div className={Styles.case_overview_container}>
            {caseMatrixData ? (
                <>
                    <Card 
                        label="Without Case Id Alerts" 
                        count={safeParseInt(caseMatrixData.withoutCaseIdAlerts?.count)} 
                        percentageChangeWeek={safeParseInt(caseMatrixData.withoutCaseIdAlerts?.percentageChangeWeek)} 
                        percentageChangeMonth={safeParseInt(caseMatrixData.withoutCaseIdAlerts?.percentageChangeMonth)} 
                        icon={ICON.ALERT}
                    />
                    <Card 
                        label="Pending Cases" 
                        count={safeParseInt(caseMatrixData.pendingCases?.count)} 
                        percentageChangeWeek={safeParseInt(caseMatrixData.pendingCases?.percentageChangeWeek)} 
                        percentageChangeMonth={safeParseInt(caseMatrixData.pendingCases?.percentageChangeMonth)} 
                        icon={ICON.PENDING}
                    />
                    <Card 
                        label="Closed Cases" 
                        count={safeParseInt(caseMatrixData.closedCases?.count)} 
                        percentageChangeWeek={safeParseInt(caseMatrixData.closedCases?.percentageChangeWeek)} 
                        percentageChangeMonth={safeParseInt(caseMatrixData.closedCases?.percentageChangeMonth)} 
                        icon={ICON.CLOSED}
                    />
                </>
            ) : (
                <p>Loading....</p>
            )}
        </div>
    );
};

export default CaseStatsCards;
