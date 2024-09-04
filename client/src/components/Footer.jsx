import React from "react";
import RiotLogo from "../assets/riot2.png";
import ValorantLogo from "../assets/valorantLOGO.webp";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        {/* Social Media Icons */}
        <div className="flex space-x-6 mb-6">
          <a
            href="https://www.facebook.com/VALORANT"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.youtube.com/PlayValorant"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaYoutube size={24} />
          </a>
          <a
            href="https://www.instagram.com/valorant"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Logos */}
        <div className="flex space-x-6 mb-6">
          <img src={RiotLogo} alt="Riot Games" className="h-12 w-auto" />
          <img src={ValorantLogo} alt="Valorant" className="h-12 w-auto" />
        </div>

        {/* Copyright and Links */}
        <p className="text-center text-gray-500 text-sm mb-6">
          © 2024, INI MERUPAKAN TUGAS INDIVIDUAL PROJECT DARI RIDHO BAGUS
          EKASANJAYA
        </p>

        <div className="flex space-x-6 text-sm text-gray-500">
          <a
            href="https://www.riotgames.com/en/privacy-notice"
            className="hover:text-gray-300"
          >
            KEBIJAKAN PRIVASI
          </a>
          <a
            href="https://www.riotgames.com/en/terms-of-service"
            className="hover:text-gray-300"
          >
            KETENTUAN PENGGUNAAN
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
