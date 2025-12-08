import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return toast.error("Please fill all fields");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Invalid Email Format");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters!");
    }

    try {
      setIsSubmitting(true);

    const res =  await axios.post("https://node-mailer-test-project-backend.vercel.app/api/v1/auth/register", formData);

      toast.success(res.data.message);
      setFormData({ name: "", email: "", password: "" });
      navigate("/");
    } catch (error) {
      toast.error(error?.res?.data?.message || "Server error");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <Toaster position="bottom-right" />

      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create an Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* FULL NAME */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              outline-none transition-all shadow-sm"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              outline-none transition-all shadow-sm"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              outline-none transition-all shadow-sm"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold 
            shadow-lg hover:bg-blue-700 transition-all disabled:bg-blue-400 
            disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
