import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import backgroundImage from "../assets/agents.jpg";

const GeminiAi = () => {
  const [loading, setLoading] = useState(false);

  const fetchTutorial = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/ai/gemini-ai");

      Swal.fire({
        title: "Generated Tutorial",
        text: response.data.tutorial,
        icon: "success",
        confirmButtonText: "Close",
        customClass: {
          popup: "bg-gray-800 text-white",
          title: "text-xl font-semibold",
          content: "text-lg",
        },
      });
    } catch (error) {
      console.error("Error fetching tutorial:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch tutorial. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
        customClass: {
          popup: "bg-gray-800 text-white",
          title: "text-xl font-semibold",
          content: "text-lg",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full flex flex-col justify-center items-center bg-cover bg-center text-white px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-2xl w-full text-center bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold mb-6">Valorant Tutorial</h1>
        <p className="text-lg mb-8">Click the button below</p>

        <button
          onClick={fetchTutorial}
          disabled={loading}
          className={`${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105`}
        >
          {loading ? "Fetching..." : "Generate Tutorial"}
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm italic text-gray-400">
          Powered by Google Gemini AI
        </p>
      </div>
    </div>
  );
};

export default GeminiAi;
