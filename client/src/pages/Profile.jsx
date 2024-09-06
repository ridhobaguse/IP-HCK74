import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProfile } from "../redux/profileSlice";
import axios from "axios";

const Profile = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedAgents, setSelectedAgents] = useState(null);
  const [selectedMaps, setSelectedMaps] = useState(null);
  const [selectedWeapons, setSelectedWeapons] = useState(null);
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { profile, error, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (profile) {
      nav(`/myprofile/${profile.id}`);
    }
  }, [profile, nav]);

  const fetchOptions = async (type) => {
    try {
      const response = await axios.get(`http://localhost:3000/val/${type}`);
      console.log("Data fetched:", response.data);
      setOptions(response.data);
    } catch (error) {
      console.error("Failed to load data for the selected type:", error);
    }
  };

  useEffect(() => {
    if (selectedType) {
      fetchOptions(selectedType);
    }
  }, [selectedType]);

  const isFormValid = () => {
    return selectedAgents && selectedMaps && selectedWeapons;
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
    setOptions([]);
  };

  const handleEntityChange = (e) => {
    const value = e.target.value;
    switch (selectedType) {
      case "agents":
        setSelectedAgents(value);
        break;
      case "maps":
        setSelectedMaps(value);
        break;
      case "weapons":
        setSelectedWeapons(value);
        break;
      default:
        break;
    }
  };

  const handleCreateCardboard = (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const profileData = {
      userId: "",
      type: selectedType,
      entityUuid: {
        agents: selectedAgents,
        maps: selectedMaps,
        weapons: selectedWeapons,
      },
    };

    dispatch(createProfile(profileData));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 border border-gray-200 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Create Cardboard</h1>
      <div className="flex justify-around mb-6">
        {["agents", "maps", "weapons"].map((type) => (
          <div
            key={type}
            className={`flex-1 m-2 p-4 border border-gray-300 rounded-lg cursor-pointer text-center hover:bg-gray-200 transition ${
              selectedType === type ? "bg-blue-100 border-blue-500" : ""
            }`}
            onClick={() => handleSelectType(type)}
          >
            <h2 className="text-xl font-semibold">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </h2>
          </div>
        ))}
      </div>

      {selectedType && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">
            Select a {selectedType.slice(0, -1)}
          </h2>
          <select
            id="entityUuid"
            value={
              selectedType === "agents"
                ? selectedAgents || ""
                : selectedType === "maps"
                ? selectedMaps || ""
                : selectedWeapons || ""
            }
            onChange={handleEntityChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select {selectedType.slice(0, -1)}</option>
            {options.length > 0 ? (
              options.map((option, index) => (
                <option key={`${option.uuid}-${index}`} value={option.uuid}>
                  {option.name}
                </option>
              ))
            ) : (
              <option disabled>Loading options...</option>
            )}
          </select>
        </div>
      )}

      <button
        onClick={handleCreateCardboard}
        className={`w-full p-3 mt-6 text-white font-semibold rounded-lg transition ${
          isFormValid()
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isFormValid()}
      >
        {loading ? "Creating Cardboard..." : "Create Cardboard"}
      </button>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default Profile;
