import React from "react";

const SearchForm = () => {
  return (
    <form className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        className="bg-white text-black rounded-l-md px-3 py-1 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-gray-700 hover:bg-gray-600 text-white rounded-r-md px-3 py-2"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
          ></path>
        </svg>
      </button>
    </form>
  );
};

export default SearchForm;
