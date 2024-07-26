import apiClient from "../config";

export const getAssetsList = async (signal) => {
    const response = await apiClient.get("https://backend.assets.k8.c3ihub/assetList", { signal });
    return response.data;
};

export const getAssetsSbomList = async (signal) => {
    const response = await apiClient.get("/assetsSbomTable.json", { signal });
    return response.data;
};

export const getAssetsDashboardData = async (signal) => {
    const response = await apiClient.get("https://backend.assets.k8.c3ihub/dashboard", { signal });
    return response.data;
};