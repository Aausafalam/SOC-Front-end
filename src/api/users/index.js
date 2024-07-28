import { constants } from "../../utils/constants";
import apiClient from "../config";

export const getUserList = async (signal) => {
    const response = await apiClient.get(constants.API_URLS.USER_LIST, { signal });
    return response.data;
};