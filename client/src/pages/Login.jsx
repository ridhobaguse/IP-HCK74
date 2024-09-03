import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import axios from "axios";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:3000/login`,
        data: { email, password },
      });
      localStorage.setItem("token", response.data.access_token);
      nav("/");
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have been successfully logged in!",
      });
    } catch (error) {
      console.error("Login failed:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Wrong Email or Password",
      });
    }
  };

  return (
    <div className="bg-login-bg bg-cover bg-center min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-transparent-white backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h1 className="text-xl font-semibold text-center mb-6 text-white">
          Sign in
        </h1>
        <input
          type="email"
          placeholder="Email@example.com"
          className="block w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="block w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none"
          >
            <FcGoogle />
            <span className="text-sm font-medium text-gray-700">
              Sign in with Google
            </span>
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="flex items-center justify-center w-12 h-12 rounded-full border border-black bg-white hover:bg-gray-100 focus:outline-none"
          >
            <BiLogInCircle className="w-8 h-8 text-gray-800" />
          </button>
        </div>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Don't have an account? Create an account
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
