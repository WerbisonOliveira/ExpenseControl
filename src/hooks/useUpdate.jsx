import { db } from '../services/firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';

export const useUpdate = () => {

    const updateData = async (id, updatedata) => {
        const refCollection = doc(db, "expenseControl", id);
        await updateDoc(refCollection, updatedata);
    }

    return {updateData};
}
