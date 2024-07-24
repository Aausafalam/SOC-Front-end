import apiClient from "../config";

export const getCaseList = async (signal) => {
    const response = await apiClient.get("/caseData.json", { signal });
    return response.data;
};