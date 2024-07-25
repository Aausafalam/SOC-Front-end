import { useState, useCallback } from "react";
import { useLoader } from "../context/LoaderContext";
import { getAssetsList, getAssetsSbomList } from "../api/assets";

export const useAssetsList = () => {
    const [assetsList, setAssetsList] = useState([]);
    const [assetsSbomList, setAssetsSbomList] = useState([]);
    const {showLoader, hideLoader} = useLoader();

    const fetchAssetsList = useCallback(async () => {
        const controller = new AbortController();
        showLoader();
        try {
            const list = await getAssetsList(controller.signal);
            setAssetsList(list);
        } catch (error) {
            setAssetsList([]);
            console.error("Error fetching Department list:", error);
        } finally {
            hideLoader();
        }
        return () => controller.abort();
    }, [showLoader, hideLoader]);

    const fetchAssetsSbomList = useCallback(async () => {
        const controller = new AbortController();
        showLoader();
        try {
            const list = await getAssetsSbomList(controller.signal);
            setAssetsSbomList(list);
        } catch (error) {
            setAssetsSbomList([]);
            console.error("Error fetching Department list:", error);
        } finally {
            hideLoader();
        }
        return () => controller.abort();
    }, [showLoader, hideLoader]);

    return { assetsList, fetchAssetsList,assetsSbomList,fetchAssetsSbomList };
};