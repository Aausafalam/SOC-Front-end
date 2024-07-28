import { createContext, useContext } from "react";
import { useUserList } from "../hooks/useUser";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const UserListState = useUserList();

    return (
        <UserContext.Provider value={{ ...UserListState}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);