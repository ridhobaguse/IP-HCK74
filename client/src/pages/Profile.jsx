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
  const navigate = useNavigate();
  const { profile, error, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (profile) {
      navigate(`/myprofile/${profile.id}`);
    }
  }, [profile, navigate]);

  const fetchOptions = async (type) => {
    try {
      const response = await axios.get(`http://localhost:3000/val/${type}`);
      setOptions(response.data);
    } catch (error) {
      console.error("Failed to load data for the selected type");
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
  };

  const handleEntityChange = (e, type) => {
    switch (type) {
      case "agents":
        setSelectedAgents(e.target.value);
        break;
      case "maps":
        setSelectedMaps(e.target.value);
        break;
      case "weapons":
        setSelectedWeapons(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleCreateProfile = (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const profileData = {
      userId: "", // Update this if needed
      type: "combined",
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
      <h1 className="text-2xl font-bold text-center mb-6">Create Profile</h1>
      <div className="flex justify-around mb-6">
        <div
          className={`flex-1 m-2 p-4 border border-gray-300 rounded-lg cursor-pointer text-center hover:bg-gray-200 transition ${
            selectedType === "agents" ? "bg-blue-100 border-blue-500" : ""
          }`}
          onClick={() => handleSelectType("agents")}
        >
          <h2 className="text-xl font-semibold">Agents</h2>
        </div>
        <div
          className={`flex-1 m-2 p-4 border border-gray-300 rounded-lg cursor-pointer text-center hover:bg-gray-200 transition ${
            selectedType === "maps" ? "bg-blue-100 border-blue-500" : ""
          }`}
          onClick={() => handleSelectType("maps")}
        >
          <h2 className="text-xl font-semibold">Maps</h2>
        </div>
        <div
          className={`flex-1 m-2 p-4 border border-gray-300 rounded-lg cursor-pointer text-center hover:bg-gray-200 transition ${
            selectedType === "weapons" ? "bg-blue-100 border-blue-500" : ""
          }`}
          onClick={() => handleSelectType("weapons")}
        >
          <h2 className="text-xl font-semibold">Weapons</h2>
        </div>
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
            onChange={(e) => handleEntityChange(e, selectedType)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select {selectedType.slice(0, -1)}</option>
            {options.map((option) => (
              <option key={option.uuid} value={option.uuid}>
                {option.displayName}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={handleCreateProfile}
        className={`w-full p-3 mt-6 text-white font-semibold rounded-lg transition ${
          isFormValid()
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isFormValid()}
      >
        {loading ? "Creating Profile..." : "Create Profile"}
      </button>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default Profile;
