import {Route, Navigate, Outlet} from 'react-router-dom'
import { useAuth } from "../context/AuthContext";

function ProtectedRouteForProfile({path, admin, children}) {

  const { loggedIn } = useAuth(); 
  return (
    loggedIn ? <Outlet/> : <Navigate to="/" />
  )
}

export default ProtectedRouteForProfile
