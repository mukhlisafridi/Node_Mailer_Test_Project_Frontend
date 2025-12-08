import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

export default function PublicRoute() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "https://node-mailer-test-project-backend.vercel.app/api/v1/auth/isAuth",
          { withCredentials: true }
        );
        setIsAuth(res.data.user ? true : false);
      } catch (err) {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) return <div>Loading...</div>; 

  return isAuth ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
