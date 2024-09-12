import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearProfile, createProfile } from "../redux/profileSlice";

const MyProfile = () => {
  const { id } = useParams(); // Get profile ID from URL params
  const dispatch = useDispatch();
  const { profile, error, loading } = useSelector((state) => state.profile); // Add loading state
  const [selectedType, setSelectedType] = useState("agents");

  // Fetch profile when the component mounts or when ID changes
  useEffect(() => {
    if (!profile || profile.id !== id) {
      dispatch(createProfile({ id }));
    }

    // Clear profile on component unmount
    return () => {
      dispatch(clearProfile());
    };
  }, [id, profile, dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  if (!profile || !profile.entityUuid) {
    return <div>No profile data found.</div>; // Handle case where no profile data is found
  }

  // Function to render data based on selected type
  const renderDataByType = () => {
    switch (selectedType) {
      case "agents":
        return profile.entityUuid.agents ? (
          <div className="p-4 border border-gray-300 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Agents</h2>
            <p>
              <strong>Agents:</strong> {profile.entityUuid.agents}
            </p>
          </div>
        ) : (
          <p>No agents data available.</p>
        );
      case "maps":
        return profile.entityUuid.maps ? (
          <div className="p-4 border border-gray-300 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Maps</h2>
            <p>
              <strong>Maps:</strong> {profile.entityUuid.maps}
            </p>
          </div>
        ) : (
          <p>No maps data available.</p>
        );
      case "weapons":
        return profile.entityUuid.weapons ? (
          <div className="p-4 border border-gray-300 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Weapons</h2>
            <p>
              <strong>Weapons:</strong> {profile.entityUuid.weapons}
            </p>
          </div>
        ) : (
          <p>No weapons data available.</p>
        );
      default:
        return <div>Invalid type selected.</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 border border-gray-200 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">My Profile</h1>

      {/* Buttons to select data type */}
      <div className="mb-4 text-center">
        {["agents", "maps", "weapons"].map((type) => (
          <button
            key={type}
            className={`mr-2 px-4 py-2 ${
              selectedType === type ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setSelectedType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Render data based on selected type */}
      <div className="flex flex-col gap-4">{renderDataByType()}</div>
    </div>
  );
};

export default MyProfile;
