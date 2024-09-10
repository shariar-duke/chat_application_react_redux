import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user) {
        // If both accessToken and user are found in local storage, dispatch the action to log the user in
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
      }
    }

    // Simulating a delay (2 seconds) for the auth check
    setTimeout(() => {
      setAuthChecked(true);
    }, 800);

  }, [dispatch]);

  // Return the authChecked state so it can be used in components
  return authChecked;
}
