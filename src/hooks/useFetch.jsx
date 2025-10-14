import { db } from "../services/firebaseConfig";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useFetch = () => {
    let {value} = useContext(AuthContext);
    const[data, setData] = useState([]);
    const collectionRef = query(collection(db, "expenseControl"), orderBy("date", "asc"), where("userId", "==", value.uid));
    
    useEffect(() => {
        const getRealTimeData = onSnapshot(collectionRef, (snapshot) => {
            const getData = () => {
                setData(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
            }
            getData();
        })
        
        return () => getRealTimeData()
    }, []);

    return {data}
  
}

