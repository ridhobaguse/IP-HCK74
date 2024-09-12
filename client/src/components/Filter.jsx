import React from "react";

const Filter = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    "All",
    "Heavy Weapons",
    "Sniper Rifles",
    "Pistols",
    "Shotguns",
    "SMGs",
  ];

  return (
    <div className="flex justify-center space-x-4 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded ${
            selectedCategory === category
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filter;
