import { db } from "../services/firebaseConfig";
import { getDocs, collection, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useUsers = () => {
    let {value} = useContext(AuthContext)
    const[user, setUser] = useState([]);
    const collectionUserRef = query(collection(db, "users"), where("userId", "==", value.uid));
    
    useEffect(() => {
        const getData = async () => {
            const data = await getDocs(collectionUserRef);
            setUser(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getData();
        
    }, []);

    const updateUser = async (id, updateUser) => {
        await updateDoc(doc(db, "users", id), updateUser)
    }
  


    return {user, updateUser}
}

