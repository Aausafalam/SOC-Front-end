import { useCallback, useState } from "react";
import { getUserList } from "../api/users";
import { useLoader } from "../context/LoaderContext";

export const useUserList = () => {
    const [UserList, setUserList] = useState([]);
    const {showLoader, hideLoader} = useLoader();

    const fetchUserList = useCallback(async () => {
        const controller = new AbortController();
        showLoader();
        try {
            const list = await getUserList(controller.signal);
            setUserList(list);
        } catch (error) {
            setUserList([]);
            console.error("Error fetching User list:", error);
        } finally {
            hideLoader();
        }
        return () => controller.abort();
    }, [showLoader, hideLoader]);

    return { UserList, fetchUserList };
};