import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Card from "../components/Card";
import SearchForm from "../components/SearchForm";
import Pagination from "../components/Pagination";

const Map = () => {
  const [maps, setMaps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mapsPerPage] = useState(8);

  const fetchMaps = async () => {
    try {
      const response = await axios.get(
        `https://valcom.ekasanjaya.my.id/val/maps`
      );
      setMaps(response.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch maps", "error");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMaps();
  }, []);

  const filteredMaps = maps.filter((map) =>
    map.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastMap = currentPage * mapsPerPage;
  const indexOfFirstMap = indexOfLastMap - mapsPerPage;
  const currentMaps = filteredMaps.slice(indexOfFirstMap, indexOfLastMap);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-5xl font-bold mt-5 mb-4 text-black">
        MAPS LIST
      </h1>

      {/* Center SearchForm */}
      <div className="flex justify-center mb-6">
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Render maps */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentMaps.map((map) => (
          <Card
            key={map.id}
            id={map.id}
            name={map.name}
            image={map.image}
            coordinates={map.coordinates}
          />
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        agentsPerPage={mapsPerPage}
        totalAgents={filteredMaps.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Map;
