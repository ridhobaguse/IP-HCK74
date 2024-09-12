import React from "react";

const Pagination = ({ agentsPerPage, totalAgents, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAgents / agentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded ${
                currentPage === number
                  ? "bg-[#4a272a] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
