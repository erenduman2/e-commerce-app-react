import {Route, Navigate, Outlet} from 'react-router-dom'
import { useAuth } from "../context/AuthContext";


// component -> ProtectedRoute içindeki element (profile)
// ...rest -> route içine girilmiş diğer property'ler
function ProtectedRouteForProfile({path, admin, children}) {

  const { loggedIn } = useAuth(); 
  return (
    loggedIn ? <Outlet/> : <Navigate to="/" />
  )
}

export default ProtectedRouteForProfile
