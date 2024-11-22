import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    try {
      const result = await axios.post("http://localhost:3001/register", {
        name,
        email,
        password,
      });

      console.log(result.data);
      console.log(result.status);
      if (result.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Left Side - Job Placement Section */}
      <div className="flex flex-col justify-center items-center w-3/5 bg-gray-300 p-8">
        <img
          src="/public/images/logo.jpg.jpg" // Replace this with the actual path of your image
          alt="Job Placement Logo"
          className="w-100 h-auto  " // Larger image size for emphasis
        />
        <p className="text-gray-700 font-medium text-center mt-6 text-xl">
          EXPLORE BETTER OPPORTUNITIES WITH{" "}
          <span className="font-bold">JOB PLACEMENT</span>
        </p>
      </div>

      {/* Right Side - Registration Form Section */}
      <div className="flex flex-col justify-center items-center w-3/5 bg-gray-200 p-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-[28rem]">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              Register
            </button>
          </form>
          <div className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-green-600 hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
