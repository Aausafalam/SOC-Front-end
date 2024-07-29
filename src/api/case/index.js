import { constants } from "../../utils/constants";
import apiClient from "../config";

export const getCaseList = async (signal) => {
    const response = await apiClient.get(constants.API_URLS.CASE, { signal });
    return response.data;
};

export const getCaseDetail = async (id, signal) => {
    const response = await apiClient.get(constants.API_URLS.CASE + "/id/"+id, { signal });
    return response.data;
};

export const getCaseServerityChart = async (signal) => {
    const response = await apiClient.get(constants.API_URLS.CASE + "/dashboard/chart/severity", { signal });
    return response.data;
};

export const getCaseMatrix = async (signal) => {
    const response = await apiClient.get(constants.API_URLS.CASE + "/dashboard/metrics", { signal });
    return response.data;
};

export const editCase = async (id, payload, signal) => {
    const response = await apiClient.put(constants.API_URLS.CASE + "/update/"+id, payload, { signal });
    return response.data;
};