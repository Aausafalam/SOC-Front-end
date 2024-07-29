import { useState, useCallback } from "react";
import { useLoader } from "../context/LoaderContext";
import { getComplianceList } from "../api/compliance";

export const useComplianceList = () => {
    const [complianceList, setComplianceList] = useState([]);
    const {showLoader, hideLoader} = useLoader();

    const fetchComplianceList = useCallback(async () => {
        const controller = new AbortController();
        showLoader();
        try {
            const list = await getComplianceList(controller.signal);
            setComplianceList(list);
        } catch (error) {
            setComplianceList([]);
            console.error("Error fetching Compliance list:", error);
        } finally {
            hideLoader();
        }
        return () => controller.abort();
    }, [showLoader, hideLoader]);

    return { complianceList, fetchComplianceList };
};