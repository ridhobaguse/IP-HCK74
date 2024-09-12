import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import RiotLogo from "../assets/valorantLOGO.webp";
import axios from "axios";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoggedUser();
  }, []);

  const fetchLoggedUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        method: "GET",
        url: "http://localhost:3000/user",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data, "User data");
      setUser(response.data);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleMyProfile = () => {
    setDropdownOpen(false);
    navigate(`/myprofile/${user.id}`);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-black text-white navbar">
      <div className="w-full mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-6 md:space-x-10">
            <Link to="/" className="flex items-center">
              <img src={RiotLogo} alt="Logo" className="h-12 w-auto" />
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/agent" className="navbar-link hover:text-gray-300">
                AGENTS
              </Link>
              <Link to="/map" className="navbar-link hover:text-gray-300">
                MAPS
              </Link>
              <Link to="/weapon" className="navbar-link hover:text-gray-300">
                WEAPONS
              </Link>
              <Link to="/profile" className="navbar-link hover:text-gray-300">
                CARDBOARD
              </Link>
              <Link
                to="/specification"
                className="navbar-link hover:text-gray-300"
              >
                SPECIFICATION
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-6 gap-5">
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none hover:bg-gray-700"
              >
                <span>{user ? user.username : "Loading..."}</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg z-50">
                  <button
                    onClick={handleMyProfile}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 focus:bg-gray-700"
                  >
                    My Card
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 focus:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
