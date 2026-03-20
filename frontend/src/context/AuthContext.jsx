import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut 
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    }

    const logout = () => {
        return signOut(auth);
    }

    // manage user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}