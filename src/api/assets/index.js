import apiClient from "../config";

export const getAssetsList = async (signal) => {
    const response = await apiClient.get("http://172.29.25.0:8080/api/assets/assetList", { signal });
    return response.data;
};

export const getAssetsSbomList = async (signal) => {
    const response = await apiClient.get("/assetsSbomTable.json", { signal });
    return response.data;
};

export const getAssetsDashboardData = async (signal) => {
    const response = await apiClient.get("http://172.29.25.0:8080/api/assets/dashboard", { signal });
    return response.data;
};