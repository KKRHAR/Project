import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const result = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      if (result.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Please check your email and password.");
      } else {
        console.error("Login error:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Left Side - Image Section */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-gray-300 p-8">
        <img
          src="/public/images/logo.jpg.jpg"
          alt="Job Placement Logo"
          className="max-w-full h-auto"
        />
        <p className="text-gray-700 font-medium text-center mt-4">
          EXPLORE BETTER OPPORTUNITY WITH{" "}
          <span className="font-bold">JOB PLACEMENT</span>
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-blue-200 p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded p-6 w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="border rounded w-full p-2 mt-1"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="border rounded w-full p-2 mt-1"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white font-bold py-2 rounded w-full mb-3"
          >
            Sign In
          </button>

          <div className="text-center mb-4">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Bottom - Additional Buttons */}
          <div className="flex justify-between">
            <button className="bg-gray-300 text-black py-2 rounded w-1/2 mr-2">
              Sign In
            </button>
            <button
             
             onClick={() => navigate("/register")} className="bg-black text-white py-2 rounded w-1/2">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
