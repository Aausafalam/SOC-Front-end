import { createContext, useContext } from "react";
import { useAddCase, useCaseDashboardData, useCaseList, useCaseMatricesData, useCaseSeverityChartData, useEditCase, useGetCaseDetail } from "../hooks/useCase";

const CaseContext = createContext();

export const CaseProvider = ({ children }) => {
    const caseListState = useCaseList();
    const caseSeverityChartState = useCaseSeverityChartData();
    const caseMatrixState = useCaseMatricesData();
    const getCaseDetailState = useGetCaseDetail();
    const editCaseState = useEditCase();
    const addCaseState = useAddCase();

    return (
        <CaseContext.Provider value={{ ...caseListState, ...caseSeverityChartState, ...caseMatrixState, ...getCaseDetailState, ...editCaseState, ...addCaseState}}>
            {children}
        </CaseContext.Provider>
    );
};

export const useCase = () => useContext(CaseContext);