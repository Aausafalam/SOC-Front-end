import { createContext, useContext } from "react";
import { useCaseList } from "../hooks/useCase";

const CaseContext = createContext();

export const CaseProvider = ({ children }) => {
    const caseListState = useCaseList();

    return (
        <CaseContext.Provider value={{ ...caseListState}}>
            {children}
        </CaseContext.Provider>
    );
};

export const useCase = () => useContext(CaseContext);