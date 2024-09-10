/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
export default function PrivateRoute({children}) {
    const isLoogedIn = useAuth()
 
    return isLoogedIn ? children : <Navigate to ="/"/>
}
