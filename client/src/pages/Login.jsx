import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import RiotLogo from "../components/RiotLogo";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin } from "@react-oauth/google";
import successSound from "../assets/sounds/jett.mp3";

const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const playSuccessSound = () => {
    const audio = new Audio(successSound);
    audio.play();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:3000/login`,
        data: { email, password },
      });
      localStorage.setItem("token", response.data.access_token);
      playSuccessSound();
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

  const fetchGoogleLogin = async (response) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/google-login",
        headers: {
          google_token: response.credential,
        },
      });

      localStorage.setItem("token", data.access_token);
      playSuccessSound();
      nav("/");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async (response) => {
    fetchGoogleLogin(response);
  };

  return (
    <div className="bg-login-bg bg-cover bg-center min-h-screen flex items-center justify-center relative">
      <RiotLogo />
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
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        {/* Google Login */}
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleGoogleLogin(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="flex items-center justify-center w-12 h-12 rounded-full border border-black bg-white hover:bg-gray-100 focus:outline-none"
          >
            <BiLogInCircle className="w-8 h-8 text-gray-800" />
          </button>
        </div>
        <div className="mt-4 text-center">
          <a
            className="text-sm text-white hover:underline"
            onClick={() => nav("/register")}
          >
            Don't have an account? Create an account
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
