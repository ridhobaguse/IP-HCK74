import React, { useState } from "react";
import Swal from "sweetalert2";

const Profile = () => {
  const [favorites, setFavorites] = useState([]);
  const [newAgent, setNewAgent] = useState("");
  const [newMap, setNewMap] = useState("");

  // Create
  const addFavorite = () => {
    if (newAgent && newMap) {
      setFavorites([...favorites, { agent: newAgent, map: newMap }]);
      setNewAgent("");
      setNewMap("");
      Swal.fire("Success", "Favorite added", "success");
    } else {
      Swal.fire("Error", "Please fill in both fields", "error");
    }
  };

  // Update
  const updateFavorite = (index, updatedAgent, updatedMap) => {
    const updatedFavorites = [...favorites];
    updatedFavorites[index] = { agent: updatedAgent, map: updatedMap };
    setFavorites(updatedFavorites);
    Swal.fire("Success", "Favorite updated", "success");
  };

  // Delete
  const deleteFavorite = (index) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(updatedFavorites);
    Swal.fire("Success", "Favorite deleted", "success");
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-3xl font-bold text-center mb-4">Profile</h1>

      {/* Create Form */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Favorite Agent"
          value={newAgent}
          onChange={(e) => setNewAgent(e.target.value)}
          className="border border-gray-300 p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Favorite Map"
          value={newMap}
          onChange={(e) => setNewMap(e.target.value)}
          className="border border-gray-300 p-2"
        />
        <button
          onClick={addFavorite}
          className="bg-blue-500 text-white px-4 py-2 ml-2"
        >
          Add Favorite
        </button>
      </div>

      {/* Read List */}
      <div>
        <h2 className="text-2xl font-bold mb-3">Favorite List</h2>
        {favorites.length === 0 ? (
          <p>No favorites added yet.</p>
        ) : (
          <ul>
            {favorites.map((fav, index) => (
              <li key={index} className="mb-2">
                <span className="mr-4">
                  Agent: {fav.agent} | Map: {fav.map}
                </span>
                {/* Update */}
                <button
                  onClick={() =>
                    updateFavorite(
                      index,
                      prompt("New Agent:", fav.agent),
                      prompt("New Map:", fav.map)
                    )
                  }
                  className="bg-yellow-500 text-white px-3 py-1 mr-2"
                >
                  Edit
                </button>
                {/* Delete */}
                <button
                  onClick={() => deleteFavorite(index)}
                  className="bg-red-500 text-white px-3 py-1"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
