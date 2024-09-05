import React, { useEffect, useState } from "react";
import axios from "axios";
import CardWeapon from "../components/CardWeapon";
import Swal from "sweetalert2";
import SearchForm from "../components/SearchForm";

const Weapon = () => {
  const [weapons, setWeapons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchWeapons = async () => {
    try {
      const response = await axios.get("http://localhost:3000/val/weapons");
      setWeapons(response.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch weapons", "error");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeapons();
  }, []);

  const filteredWeapons = weapons.filter((weapon) =>
    weapon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-5xl font-bold mt-5 mb-4 text-black">
        WEAPONS LIST
      </h1>

      <div className="flex justify-center mb-6">
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
