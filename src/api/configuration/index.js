import axios from "axios";
import { constants } from "../../utils/constants";
import apiClient from "../config";

export const getConfigurationList = async (signal) => {
  const response = await axios.get("http://192.168.40.52:6001/api/benchmark_summary", { signal });
  return response.data;
};

export const getConfigurationDetail = async (id, signal) => {
  // const response = await apiClient.get(constants.API_URLS.ALERT + "/"+id, { signal });
  const response = await axios.get(`http://192.168.40.48:8080/api/alerts/id/${id}`, { signal });
  return response.data.data.alertDetails;
};


export const getSeverityConfigurationCountChart = async (id, signal) => {
    // const response = await apiClient.get(constants.API_URLS.ALERT + "/"+id, { signal });
    const response = await axios.get("/alertDetail.json", { signal });
    return response.data.data;
  };
  