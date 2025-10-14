import { createContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { useUsers } from "../hooks/useUsers";
import { useDelete } from "../hooks/useDelete";
import { useUpdate } from "../hooks/useUpdate";
import { useAccountDelete } from "../hooks/useAccountDelete";

export const ContextData = createContext();

export const ContextDataProvider = ({children}) => {
    const {data, postData} = useFetch();
    const {user, updateUser} = useUsers();
    const {deleteLaunch} = useDelete();
    const {updateData} = useUpdate();
    const {deleteAccountUser} = useAccountDelete();

    return (
        <ContextData value={{data, postData, user, deleteLaunch, updateData, updateUser, deleteAccountUser}}>
            {children}
        </ContextData>
    )
}