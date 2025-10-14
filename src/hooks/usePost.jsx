import { db } from "../services/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

export const usePost = () => {
    const [response, setResponse] = useState("");
    const refCollection = collection(db, "expenseControl");

    const post = async (postdata) => {
        const postData = await addDoc(refCollection, postdata);
        setResponse(postData);
    }
    

    return {response, post};
}
