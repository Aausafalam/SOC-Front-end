import { ICON } from "../../../utils/icon";
import Styles from "../styles/case.module.css";
import Card from "./Card";

const CaseStatsCards = () => {

    const caseMatrixCounts = {
        withoutCaseIdAlerts:{
            count:0,
            percentageChangeWeek:null,
            percentageChangeMonth:null,
        },
        pendingCases:{
            count:4,
            percentageChangeWeek:-5,
            percentageChangeMonth:6,
        },
        closedCases:{
            count:1,
            percentageChangeWeek:15,
            percentageChangeMonth:-8,
        }
    };

    return (
        <div className={Styles.case_overview_container}>
            <Card 
                label="Without Case Id Alerts" 
                count={caseMatrixCounts.withoutCaseIdAlerts.count} 
                percentageChangeWeek={caseMatrixCounts.withoutCaseIdAlerts.percentageChangeWeek} 
                percentageChangeMonth={caseMatrixCounts.withoutCaseIdAlerts.percentageChangeMonth} 
                icon={ICON.ALERT}
            />
            <Card 
                label="Pending Cases" 
                count={caseMatrixCounts.pendingCases.count} 
                percentageChangeWeek={caseMatrixCounts.pendingCases.percentageChangeWeek} 
                percentageChangeMonth={caseMatrixCounts.pendingCases.percentageChangeMonth} 
                icon={ICON.PENDING}
            />
            <Card 
                label="Closed Cases" 
                count={caseMatrixCounts.closedCases.count} 
                percentageChangeWeek={caseMatrixCounts.closedCases.percentageChangeWeek} 
                percentageChangeMonth={caseMatrixCounts.closedCases.percentageChangeMonth} 
                icon={ICON.CLOSED}
            />
        </div>
        )
}

export default CaseStatsCards;