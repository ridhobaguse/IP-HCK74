import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";
import RiotLogo from "../components/RiotLogo";
import successSound from "../assets/sounds/chamber.mp3";

const Register = () => {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const playSuccessSound = () => {
    new Audio(successSound).play();
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Passwords do not match!",
      });
      return;
    }

    try {
      const response = await axios.post(
        `https://valcom.ekasanjaya.my.id/register`,
        {
          username,
          email,
          password,
        }
      );

      playSuccessSound();

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have successfully registered!",
      });

      nav("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  const handleCancel = () => {
    nav("/login");
  };

  return (
    <div className="bg-login-bg bg-cover bg-center min-h-screen flex items-center justify-center relative">
      {/* Riot Games Logo */}
      <RiotLogo />
      <form
        onSubmit={handleRegister}
        className="bg-transparent-white backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h1 className="text-xl font-semibold text-center mb-6 text-white">
          Create an Account
        </h1>
        <input
          type="text"
          placeholder="Username"
          className="block w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email@example.com"
          className="block w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="block w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="w-1/2 mr-2 py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none transition duration-300 ease-in-out"
          >
            Register
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-1/2 ml-2 py-3 px-6 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none transition duration-300 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
