import { createContext, useContext } from "react";
import { useCaseDashboardData, useCaseList, useCaseMatricesData, useCaseSeverityChartData } from "../hooks/useCase";

const CaseContext = createContext();

export const CaseProvider = ({ children }) => {
    const caseListState = useCaseList();
    const caseSeverityChartState = useCaseSeverityChartData();
    const caseMatrixState = useCaseMatricesData();

    return (
        <CaseContext.Provider value={{ ...caseListState, ...caseSeverityChartState, ...caseMatrixState}}>
            {children}
        </CaseContext.Provider>
    );
};

export const useCase = () => useContext(CaseContext);