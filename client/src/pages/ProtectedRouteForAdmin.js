import {Route, Navigate, Outlet} from 'react-router-dom'
import { useAuth } from "../context/AuthContext";

function ProtectedRouteForProfile({path, admin, children}) {

  const { user } = useAuth(); 
  return (
    user.role === "admin" ? <Outlet/> : <Navigate to="/" />
  )
}

export default ProtectedRouteForProfile
