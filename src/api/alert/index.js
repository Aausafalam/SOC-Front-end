import axios from "axios";
import { constants } from "../../utils/constants";
import apiClient from "../config";

export const getAlertList = async (signal) => {
  const response = await axios.get("http://172.29.25.0:8080/api/alerts", { signal });
  return response.data;
};

export const getAlertDetail = async (id, signal) => {
  // const response = await apiClient.get(constants.API_URLS.ALERT + "/"+id, { signal });
  const response = await axios.get(`http://172.29.25.0:8080/api/alerts/id/${id}`, { signal });
  return response.data.data;
};


export const getSeverityAlertCountChart = async (id, signal) => {
    // const response = await apiClient.get(constants.API_URLS.ALERT + "/"+id, { signal });
    const response = await apiClient.get("/alertDetail.json", { signal });
    return response.data.data;
  };
  