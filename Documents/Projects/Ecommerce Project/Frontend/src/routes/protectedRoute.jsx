import { Navigate,Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function ProtectedRoutes(){
    const {user}=useContext(AuthContext);

    return user? <Outlet/> : <Navigate to='/login'/>;
}