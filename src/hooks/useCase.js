import { useState, useCallback } from "react";
import { useLoader } from "../context/LoaderContext";
import { getCaseList } from "../api/case";

export const useCaseList = () => {
    const [caseList, setCaseList] = useState([]);
    const {showLoader, hideLoader} = useLoader();

    const fetchCaseList = useCallback(async () => {
        const controller = new AbortController();
        showLoader();
        try {
            const list = await getCaseList(controller.signal);
            setCaseList(list);
        } catch (error) {
            setCaseList([]);
            console.error("Error fetching Case list:", error);
        } finally {
            hideLoader();
        }
        return () => controller.abort();
    }, [showLoader, hideLoader]);

    return { caseList, fetchCaseList };
};