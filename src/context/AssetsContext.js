import { createContext, useContext } from "react";
import { useAssetsList } from "../hooks/useAssets";

const AssetsContext = createContext();

export const AssetsProvider = ({ children }) => {
    const assetsListState = useAssetsList();

    return (
        <AssetsContext.Provider value={{ ...assetsListState}}>
            {children}
        </AssetsContext.Provider>
    );
};

export const useAssets = () => useContext(AssetsContext);