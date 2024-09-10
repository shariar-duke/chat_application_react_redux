/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Ensure this hook works as expected

export default function PublicRoute({ children }) {
  const isLoggedIn = useAuth();  // Fix the typo: isLoggedIn

  // If the user is logged in, navigate them to the home page ('/'), otherwise render the child components
  return !isLoggedIn ? children : <Navigate to ="/inbox"/> ;
}
