import { db } from "../services/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

export const useDelete = () => {

    const deleteLaunch = async (id) => {
        await deleteDoc(doc(db, "expenseControl", id))
    }

    return {deleteLaunch};
}
