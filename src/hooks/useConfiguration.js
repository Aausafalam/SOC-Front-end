import { useState, useCallback } from "react";
import { useLoader } from "../context/LoaderContext";
// import { getCaseDashboardData, getCaseList } from "../api/case";
import { getConfigurationDetail, getConfigurationList } from "../api/configuration";

export const useConfigurationList = () => {
    const [configurationList, setConfigurationList] = useState([]);
    const {showLoader, hideLoader} = useLoader();

    const fetchConfigurationList = useCallback(async () => {
        const controller = new AbortController();
        showLoader();
        try {
            const list = await getConfigurationList(controller.signal);
            setConfigurationList(list);
        } catch (error) {
            setConfigurationList([]);
            console.error("Error fetching configuration list:", error);
        } finally {
            hideLoader();
        }
        return () => controller.abort();
    }, [showLoader, hideLoader]);

    return { configurationList, fetchConfigurationList };
};

export const useConfigurationDetail = () => {
    const [configurationDetail, setConfigurationDetail] = useState([]);
    const {showLoader, hideLoader} = useLoader();

    const fetchConfigurationDetail = useCallback(async (id) => {
        const controller = new AbortController();
        showLoader();
        try {
            const list = await getConfigurationDetail(id, controller.signal);
            setConfigurationDetail(list);
        } catch (error) {
            setConfigurationDetail([]);
            console.error("Error fetching configuration detail:", error);
        } finally {
            hideLoader();
        }
        return () => controller.abort();
    }, [showLoader, hideLoader]);

    return { configurationDetail, fetchConfigurationDetail };
}