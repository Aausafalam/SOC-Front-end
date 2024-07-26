import { ICON } from "../../../utils/icon";
import Styles from "../styles/alert.module.css";
import Card from "./card/Card";

const AlertStatCards = () => {

    const caseMatrixCounts = {
        totalAlerts:{
            count:0,
            percentageChangeWeek:null,
            percentageChangeMonth:null,
        },
        networkAlerts:{
            count:4,
            percentageChangeWeek:-5,
            percentageChangeMonth:6,
        },
        endPointAlerts:{
            count:1,
            percentageChangeWeek:15,
            percentageChangeMonth:-8,
        }
    };

    return (
        <div className={Styles.case_overview_container}>
            <Card 
                label="Total Alerts" 
                count={caseMatrixCounts.totalAlerts.count} 
                percentageChangeWeek={caseMatrixCounts.totalAlerts.percentageChangeWeek} 
                percentageChangeMonth={caseMatrixCounts.totalAlerts.percentageChangeMonth} 
                icon={ICON.ALERT}
            />
            <Card 
                label="Network Alerts" 
                count={caseMatrixCounts.networkAlerts.count} 
                percentageChangeWeek={caseMatrixCounts.networkAlerts.percentageChangeWeek} 
                percentageChangeMonth={caseMatrixCounts.networkAlerts.percentageChangeMonth} 
                icon={ICON.PENDING}
            />
            <Card 
                label="EndPoint Alert" 
                count={caseMatrixCounts.endPointAlerts.count} 
                percentageChangeWeek={caseMatrixCounts.endPointAlerts.percentageChangeWeek} 
                percentageChangeMonth={caseMatrixCounts.endPointAlerts.percentageChangeMonth} 
                icon={ICON.CLOSED}
            />
            <Card 
                label="Network Alerts" 
                count={caseMatrixCounts.networkAlerts.count} 
                percentageChangeWeek={caseMatrixCounts.networkAlerts.percentageChangeWeek} 
                percentageChangeMonth={caseMatrixCounts.networkAlerts.percentageChangeMonth} 
                icon={ICON.PENDING}
            />
        </div>
        )
}

export default AlertStatCards;