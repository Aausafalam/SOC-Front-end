import { useState, useCallback } from "react";
import { useLoader } from "../context/LoaderContext";
import { getCaseDashboardData, getCaseList, getCaseMatrix, getCaseServerityChart } from "../api/case";

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

export const useCaseSeverityChartData = () => {
    const [caseServerityChartData, setCaseServerityChartData] = useState([]);
    const {showLoader, hideLoader} = useLoader();

    const fetchCaseSevertityChartData = useCallback(async () => {
        const controller = new AbortController();
        showLoader();
        try {
            const list = await getCaseServerityChart(controller.signal);
            setCaseServerityChartData(list);
        } catch (error) {
            setCaseServerityChartData([]);
            console.error("Error fetching Case Severity Chart data:", error);
        } finally {
            hideLoader();
        }
        return () => controller.abort();
    }, [showLoader, hideLoader]);

    return { caseServerityChartData, fetchCaseSevertityChartData };
}

export const useCaseMatricesData = () => {
    const [caseMatrixData, setCaseMatrixData] = useState([]);
    const {showLoader, hideLoader} = useLoader();

    const fetchCaseMatricesData = useCallback(async () => {
        const controller = new AbortController();
        showLoader();
        try {
            const list = await getCaseMatrix(controller.signal);
            setCaseMatrixData(list);
        } catch (error) {
            setCaseMatrixData([]);
            console.error("Error fetching Case Matrices data:", error);
        } finally {
            hideLoader();
        }
        return () => controller.abort();
    }, [showLoader, hideLoader]);

    return { caseMatrixData, fetchCaseMatricesData };
}