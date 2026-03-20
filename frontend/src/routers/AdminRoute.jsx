import { Navigate, Outlet } from "react-router-dom";
export default function AdminRoute({children}){
    const token = localStorage.getItem('token');
    if(!token){
        return <Navigate  to="/admin"/>
    }
    return children ? children : <Outlet/>;0
}