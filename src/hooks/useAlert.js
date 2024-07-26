import { useState, useCallback } from "react";
import { useLoader } from "../context/LoaderContext";
import { getCaseDashboardData, getCaseList } from "../api/case";
import { getAlertDetail, getAlertList } from "../api/alert";

export const useAlertList = () => {
    const [AlertList, setAlertList] = useState([]);
    const {showLoader, hideLoader} = useLoader();

    const fetchAlertList = useCallback(async () => {
        const controller = new AbortController();
        showLoader();
        try {
            const list = await getAlertList(controller.signal);
            setAlertList(list);
        } catch (error) {
            setAlertList([]);
            console.error("Error fetching alert list:", error);
        } finally {
            hideLoader();
        }
        return () => controller.abort();
    }, [showLoader, hideLoader]);

    return { AlertList, fetchAlertList };
};

export const useAlertDetail = () => {
    const [alertDetail, setAlertDetail] = useState([]);
    const {showLoader, hideLoader} = useLoader();

    const fetchAlertDetail = useCallback(async (id) => {
        const controller = new AbortController();
        showLoader();
        try {
            const list = await getAlertDetail(id, controller.signal);
            setAlertDetail(list);
        } catch (error) {
            setAlertDetail([]);
            console.error("Error fetching alert detail:", error);
        } finally {
            hideLoader();
        }
        return () => controller.abort();
    }, [showLoader, hideLoader]);

    return { alertDetail, fetchAlertDetail };
}