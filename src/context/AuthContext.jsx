import { createContext } from "react";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useAuthState, useSignOut, useVerifyBeforeUpdateEmail, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from "../services/firebaseConfig";



export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithEmailAndPassword, userSignIn, load, erro] = useSignInWithEmailAndPassword(auth);
    const [value, loadState] = useAuthState(auth);
    const [signOut, loadSignOut, errorSignOut] = useSignOut(auth);
    const [verifyBeforeUpdateEmail] = useVerifyBeforeUpdateEmail(auth);
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);


    return (
        <AuthContext value={{createUserWithEmailAndPassword, user, loading, error, signInWithEmailAndPassword, userSignIn, load, erro, value, loadState, signOut, loadSignOut, errorSignOut, verifyBeforeUpdateEmail, sendPasswordResetEmail}}>{children}</AuthContext>
    )
}