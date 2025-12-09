import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.js";

export default function PublicRoute() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const storedName = localStorage.getItem("name");

      if (!storedName) {
        setIsAuth(false);
        return;
      }

      
      try {
        const res = await axiosInstance.get("/isAuth");
        setIsAuth(!!res.data.user);
      } catch (err) {
      
        localStorage.removeItem("name");
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuth ? <Navigate to="/dashboard" replace /> : <Outlet />;
}