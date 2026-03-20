import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import Loading from "../components/Loading"

export default function PrivateRoute({children}){
    const {currentUser, loading} = useAuth();
    if(loading){
        return <Loading/>
    }
    if (currentUser){
        return children
    }
    return <Navigate to="/login" replace/>
}