import { createContext, useContext } from "react";
import { useConfigurationDetail, useConfigurationList } from "../hooks/useConfiguration";

const ConfigurationContext = createContext();

export const ConfigurationProvider = ({ children }) => {
    const configurationListState = useConfigurationList();
    const configurationDetailState = useConfigurationDetail();

    return (
        <ConfigurationContext.Provider value={{ ...configurationListState, ...configurationDetailState}}>
            {children}
        </ConfigurationContext.Provider>
    );
};

export const useConfiguration = () => useContext(ConfigurationContext);