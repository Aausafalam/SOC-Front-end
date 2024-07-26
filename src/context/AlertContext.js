import { createContext, useContext } from "react";
import { useAlertDetail, useAlertList } from "../hooks/useAlert";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const alertListState = useAlertList();
    const alertDetailState = useAlertDetail();

    return (
        <AlertContext.Provider value={{ ...alertListState, ...alertDetailState}}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);