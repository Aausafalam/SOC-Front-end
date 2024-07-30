import axios from "axios";
import { constants } from "../utils/constants";
import { notifyError } from "../utils/toastUtil";

const apiClient = axios.create({
  baseURL: constants.API_BASE_URL
});

apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    // }
    // if (!config.headers["Content-Type"]) {
    //   config.headers["Content-Type"] = "application/json";
    // }

    // config.headers["Content-Security-Policy"] =
    //   "default-src 'self'; img-src 'self' data: blob:;";
    return config;
  },
  (error) => {
    notifyError("Request error: " + error.message);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // response.data.modified = true;
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || "An error occurred";
    notifyError(errorMessage);
    return Promise.reject(error);
  }
);

export default apiClient;
