// ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute() {
  const [isAuth, setIsAuth] = useState(null); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/auth/isAuth",
          { withCredentials: true }
        );
        if (res.data.user) {
          setIsAuth(true);
        }
      } catch (err) {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) return <div>Loading...</div>; 

  return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}
