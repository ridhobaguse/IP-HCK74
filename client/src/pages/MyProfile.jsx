import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearProfile } from "../redux/profileSlice";

const MyProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, error } = useSelector((state) => state.profile);
  const [selectedType, setSelectedType] = useState("agents"); // Default type

  useEffect(() => {
    if (!profile || profile.id !== id) {
      // Dispatch an action to fetch the profile if it doesn't match
      // (Assuming you have an action to fetch the profile, e.g., fetchProfile(id))
      // dispatch(fetchProfile(id));
    }
    return () => dispatch(clearProfile()); // Clear profile when component unmounts
  }, [id, profile, dispatch]);

  if (error) return <div>Error: {error}</div>;
  if (!profile || !profile.entityUuid) return <div>Loading...</div>;

  // Function to render data based on the selected type
  const renderDataByType = () => {
    switch (selectedType) {
      case "agents":
        return (
          profile.entityUuid.agents && (
            <div className="p-4 border border-gray-300 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Agents</h2>
              <p>
                <strong>Agents:</strong> {profile.entityUuid.agents}
              </p>
            </div>
          )
        );
      case "maps":
        return (
          profile.entityUuid.maps && (
            <div className="p-4 border border-gray-300 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Maps</h2>
              <p>
                <strong>Maps:</strong> {profile.entityUuid.maps}
              </p>
            </div>
          )
        );
      case "weapons":
        return (
          profile.entityUuid.weapons && (
            <div className="p-4 border border-gray-300 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Weapons</h2>
              <p>
                <strong>Weapons:</strong> {profile.entityUuid.weapons}
              </p>
            </div>
          )
        );
      default:
        return <div>Invalid type selected</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 border border-gray-200 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">My Profile</h1>

      {/* Buttons to select data type */}
      <div className="mb-4 text-center">
        <button
          className={`mr-2 px-4 py-2 ${
            selectedType === "agents" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setSelectedType("agents")}
        >
          Agents
        </button>
        <button
          className={`mr-2 px-4 py-2 ${
            selectedType === "maps" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setSelectedType("maps")}
        >
          Maps
        </button>
        <button
          className={`px-4 py-2 ${
            selectedType === "weapons"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => setSelectedType("weapons")}
        >
          Weapons
        </button>
      </div>

      {/* Render data based on selected type */}
      <div className="flex flex-col gap-4">{renderDataByType()}</div>
    </div>
  );
};

export default MyProfile;
