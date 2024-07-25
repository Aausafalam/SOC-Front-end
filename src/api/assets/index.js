import apiClient from "../config";

export const getAssetsList = async (signal) => {
    const response = await apiClient.get("/assetsTable.json", { signal });
    return response.data;
};

export const getAssetsSbomList = async (signal) => {
    const response = await apiClient.get("/assetsSbomTable.json", { signal });
    return response.data;
};