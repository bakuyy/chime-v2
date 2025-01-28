import { ReactNode, useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../constants";

// define types for the component props
interface ProtectedRouteProps {
  children: ReactNode; // 'children' can be any valid react node
}

interface DecodedToken {
  exp: number;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      setIsAuthorized(false);
      return;
    }

    try {
      const res = await api.post("/api/token/refresh/", { refresh: refreshToken });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error("error refreshing token:", error);
      setIsAuthorized(false);
    }
  }, []);

  // authentication check logic
  const auth = useCallback(async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token); // decode the jwt token and specify the type for decoded data
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now) {
        await refreshToken(); // token expired, refresh it
      } else {
        setIsAuthorized(true); // if its a valid token, proceed to protected content
      }
    } catch (error) {
      console.error("error decoding token:", error);
      setIsAuthorized(false);
    }
  }, [refreshToken]);

  useEffect(() => {
    auth();
  }, [auth]); // trigger the auth function on mount

  if (isAuthorized === null) {
    return <div>loading...</div>; // show loading until authorization check completes
  }

  return isAuthorized ? (
    <>{children}</> // render protected content if authorized
  ) : (
    <Navigate to="/login" /> // redirect to login if not authorized
  );
}

export default ProtectedRoute;
