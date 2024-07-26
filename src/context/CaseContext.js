import { createContext, useContext } from "react";
import { useCaseDashboardData, useCaseList } from "../hooks/useCase";

const CaseContext = createContext();

export const CaseProvider = ({ children }) => {
    const caseListState = useCaseList();
    const caseDashboardDataState = useCaseDashboardData();

    return (
        <CaseContext.Provider value={{ ...caseListState, ...caseDashboardDataState}}>
            {children}
        </CaseContext.Provider>
    );
};

export const useCase = () => useContext(CaseContext);