import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;

      try {
        await axios.get(`https://node-mailer-test-project-backend.vercel.app/api/v1/verify?token=${token}`);
        toast.success("Email verified successfully!");
        navigate("/"); 
      } catch (err) {
        toast.error(err.response?.data?.message || "Verification failed");
        navigate("/"); 
      }
    };
    verifyEmail();
  }, [token]);

  return <div className="text-center mt-10">Verifying your email...</div>;
}
