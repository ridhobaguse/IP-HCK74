import React from "react";
import YoruImage from "../assets/yoru.jpg";

const Specification = () => {
  return (
    <div className="bg-gray-900 text-white py-16 px-6">
      <div className="relative">
        <img
          src={YoruImage}
          alt="Yoru"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
        <h1 className="absolute bottom-4 left-6 text-4xl font-extrabold text-white bg-red-500 bg-opacity-75 px-4 py-2 rounded-md">
          Spesifikasi
        </h1>
      </div>
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-center text-red-400">
          Minimum Requirement
        </h2>
        <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left">
              <th className="py-3 px-6 bg-red-500">OS</th>
              <th className="py-3 px-6 bg-red-500">CPU</th>
              <th className="py-3 px-6 bg-red-500">GPU</th>
              <th className="py-3 px-6 bg-red-500">RAM</th>
              <th className="py-3 px-6 bg-red-500">VRAM</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-600 hover:bg-gray-500 transition duration-300">
              <td className="border-t border-gray-500 px-6 py-4">
                Windows 10 (Build 19041+)
              </td>
              <td className="border-t border-gray-500 px-6 py-4">
                Intel Core 2 Duo E8400
              </td>
              <td className="border-t border-gray-500 px-6 py-4">
                Intel HD 4000
              </td>
              <td className="border-t border-gray-500 px-6 py-4">4 GB</td>
              <td className="border-t border-gray-500 px-6 py-4">1 GB</td>
            </tr>
            <tr className="bg-gray-600 hover:bg-gray-500 transition duration-300">
              <td className="border-t border-gray-500 px-6 py-4">Windows 11</td>
              <td className="border-t border-gray-500 px-6 py-4">
                Intel i3-4150 / Ryzen 3 1200
              </td>
              <td className="border-t border-gray-500 px-6 py-4">
                Geforce GT 730
              </td>
              <td className="border-t border-gray-500 px-6 py-4">4 GB</td>
              <td className="border-t border-gray-500 px-6 py-4">1 GB</td>
            </tr>
            <tr className="bg-gray-600 hover:bg-gray-500 transition duration-300">
              <td className="border-t border-gray-500 px-6 py-4">Windows 11</td>
              <td className="border-t border-gray-500 px-6 py-4">
                Intel i5-9400F / Ryzen 5 2600X
              </td>
              <td className="border-t border-gray-500 px-6 py-4">
                GTX 1050 Ti
              </td>
              <td className="border-t border-gray-500 px-6 py-4">4 GB</td>
              <td className="border-t border-gray-500 px-6 py-4">1 GB</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-6 text-center text-gray-400">
          Di Windows 11, kita juga memerlukan "TPM 2.0 dan UEFI Secure Boot".
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href="https://playvalorant.com/id-id/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-red-700 transition duration-300"
          >
            Download Valorant
          </a>
        </div>
      </div>
    </div>
  );
};

export default Specification;
