import apiClient from "../config";

export const getCaseList = async (signal) => {
    const response = await apiClient.get("/caseData2.json", { signal });
    return response.data.data;
};

export const getCaseDashboardData = async (signal) => {
    const response = await apiClient.get("http://192.168.42.39:3000/case/dashboard/chart/severity", { signal });
    return response.data;
};