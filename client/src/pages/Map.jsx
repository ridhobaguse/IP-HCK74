import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Card from "../components/Card";

const Map = () => {
  const [maps, setMaps] = useState([]);

  const fetchMaps = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/val/maps`);
      setMaps(response.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch maps", "error");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMaps();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4 text-white">
        Maps List
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {maps.map((map) => (
          <Card
            key={map.id}
            id={map.id}
            name={map.name}
            image={map.image}
            coordinates={map.coordinates}
          />
        ))}
      </div>
    </div>
  );
};

export default Map;
