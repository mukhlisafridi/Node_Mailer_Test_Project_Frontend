import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate =useNavigate()
  const name =localStorage.getItem("name")

  const handlerLogout=async()=>{
  try {
     const res = await axios.post("http://localhost:3000/api/v1/auth/logout",{},{withCredentials:true})
    toast.success(res.data.message)
    localStorage.removeItem("name");
    navigate("/")
  } catch (error) {
    toast.error(error.res.data.message)
  }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-5 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-600 mb-8">Dashboard</h2>

        <nav className="space-y-4">
          <a className="block text-gray-700 font-medium hover:text-blue-600 cursor-pointer">
            Overview
          </a>
          <a className="block text-gray-700 font-medium hover:text-blue-600 cursor-pointer">
            Profile
          </a>
          <a className="block text-gray-700 font-medium hover:text-blue-600 cursor-pointer">
            Settings
          </a>
          <a className="block text-gray-700 font-medium hover:text-blue-600 cursor-pointer" onClick={handlerLogout}>
            Logout
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, <span className="text-blue-600">{name}</span> 
        </h1>
        <p className="text-gray-600 mt-1">Here is your dashboard overview.</p>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Total Tasks</h3>
            <p className="text-3xl font-bold mt-3 text-blue-600">42</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Completed</h3>
            <p className="text-3xl font-bold mt-3 text-green-600">28</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Pending</h3>
            <p className="text-3xl font-bold mt-3 text-red-600">14</p>
          </div>
        </div>
      </main>
    </div>
  );
}
