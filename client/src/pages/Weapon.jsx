import React, { useEffect, useState } from "react";
import axios from "axios";
import CardWeapon from "../components/CardWeapon";
import Swal from "sweetalert2";
import SearchForm from "../components/SearchForm";

const Weapon = () => {
  const [weapons, setWeapons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchWeapons = async () => {
    try {
      const response = await axios.get(
        `https://valcom.ekasanjaya.my.id/val/weapons`
      );
      setWeapons(response.data);

      const uniqueCategories = [
        ...new Set(response.data.map((weapon) => weapon.shopData?.category)),
      ].filter(Boolean);
      setCategories(uniqueCategories);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch weapons", "error");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeapons();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? "" : category);
  };

  const filteredWeapons = weapons.filter((weapon) => {
    const matchesSearch = weapon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? weapon.shopData?.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-5xl font-bold mt-5 mb-4 text-black">
        WEAPONS LIST
      </h1>

      <div className="flex justify-center mb-6">
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="flex flex-wrap justify-center mb-6 gap-2">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 border rounded-md cursor-pointer ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {filteredWeapons.map((weapon) => (
          <CardWeapon
            key={weapon.id}
            id={weapon.id}
            title={weapon.name}
            image={weapon.displayIcon}
            stats={weapon.weaponStat}
            shopData={weapon.shopData}
          />
        ))}
      </div>
    </div>
  );
};

export default Weapon;
