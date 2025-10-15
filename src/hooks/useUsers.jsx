import { db } from "../services/firebaseConfig";
import { getDocs, collection, updateDoc, doc, query, where, onSnapshot } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useUsers = () => {
    let {value} = useContext(AuthContext)
    const[user, setUser] = useState([]);
    const collectionUserRef = query(collection(db, "users"), where("userId", "==", value.uid));
    
    useEffect(() => {
        const getData = onSnapshot(collectionUserRef, (snapshot) => {
            const data = () => {
                setUser(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
            }
            data();
        })

        return () => getData();
        
    }, []);

    const updateUser = async (id, updateUser) => {
        await updateDoc(doc(db, "users", id), updateUser)
    }
  


    return {user, updateUser}
}

