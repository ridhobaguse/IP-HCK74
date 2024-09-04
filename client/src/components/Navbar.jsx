import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import SearchForm from "./Search";
import RiotLogo from "../assets/valorantLOGO.webp";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setDropdownOpen(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-black text-white">
      <div className="w-full mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-6 md:space-x-10">
            <Link to="/" className="flex items-center">
              <img src={RiotLogo} alt="Logo" className="h-12 w-auto" />
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/agent" className="hover:text-gray-300">
                AGENTS
              </Link>
              <Link to="/" className="hover:text-gray-300">
                MAPS
              </Link>
              <Link to="/weapon" className="hover:text-gray-300">
                WEAPONS
              </Link>
              <Link to="/pbe-signup" className="hover:text-gray-300">
                MY PROFILE
              </Link>
              <Link to="/specification" className="hover:text-gray-300">
                SPECIFICATION
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <SearchForm />
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none hover:bg-gray-700"
              >
                <span>USERNAME</span>
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
