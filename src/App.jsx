import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import VerifyPage from "./pages/VerifyPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Toaster position="bottom-right" />
        <Routes>
          {/* Public pages */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
             <Route path="/verify" element={<VerifyPage />} /> 
          </Route>
          {/* protected pages */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
