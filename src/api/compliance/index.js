import apiClient from "../config";

export const getComplianceList = async (signal) => {
    const response = await apiClient.get("/policy_data.json", { signal });
    return response.data;
};