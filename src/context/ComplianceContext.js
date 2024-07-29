import { createContext, useContext } from "react";
import { useComplianceList } from "../hooks/useCompliance";

const ComplianceContext = createContext();

export const ComplianceProvider = ({ children }) => {
    const complianceListState = useComplianceList();

    return (
        <ComplianceContext.Provider value={{ ...complianceListState}}>
            {children}
        </ComplianceContext.Provider>
    );
};

export const useCompliance = () => useContext(ComplianceContext);