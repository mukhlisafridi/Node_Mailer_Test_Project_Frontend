import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.js";

export default function PublicRoute() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/isAuth");
        setIsAuth(res.data.authenticated);
      } catch (err) {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

 
  if (isAuth === null) return <div>Loading...</div>;

  return isAuth ? <Navigate to="/dashboard" replace /> : <Outlet />;
}