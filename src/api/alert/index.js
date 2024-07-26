import { constants } from "../../utils/constants";
import apiClient from "../config";

export const getAlertList = async (signal) => {
  const response = await apiClient.get("/caseData2.json", { signal });
  return response.data.data;
};

export const getAlertDetail = async (id, signal) => {
  // const response = await apiClient.get(constants.API_URLS.ALERT + "/"+id, { signal });
  const response = await apiClient.get("/alertDetail.json", { signal });
  return response.data.data;
};


export const getSeverityAlertCountChart = async (id, signal) => {
    // const response = await apiClient.get(constants.API_URLS.ALERT + "/"+id, { signal });
    const response = await apiClient.get("/alertDetail.json", { signal });
    return response.data.data;
  };
  