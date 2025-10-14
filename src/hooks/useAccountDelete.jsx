import {deleteUser} from 'firebase/auth'
import { getDocs, doc, collection, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';


export const useAccountDelete = () => {

    const deleteUserAuth = async (user) => {
        try {
            await deleteUser(user)
        } catch (error) {
            console.log("Erro ao apagar usuário " + error)
        }
    }

    const deleteDocs = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id))

            const refCollection = query(collection(db, "expenseControl"), where("userId", "==", id))

            const docsUser = await getDocs(refCollection);
            const deleteDocs = docsUser.docs.map((doc) => deleteDoc(doc.ref))
            await Promise.all(deleteDocs)
        } catch (error) {
            console.log("Erro ao apagar dados do usuário" + error)
        }
    }

    const deleteAccountUser = async (user, id) => {
        await deleteDocs(id);
        await deleteUserAuth(user);
    }

    return {deleteAccountUser}
  
}
