import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearProfile } from "../redux/profileSlice";

const MyProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, error } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!profile || profile.id !== id) {
      // Clear profile when component mounts to ensure fresh data
      dispatch(clearProfile());
    }
    // Clean up when component unmounts
    return () => dispatch(clearProfile());
  }, [id, profile, dispatch]);

  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 border border-gray-200 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Profile Details</h1>
      <div className="flex flex-col gap-4">
        {profile.entityUuid.agents && (
          <div className="p-4 border border-gray-300 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Agent</h2>
            <p>
              <strong>UUID:</strong> {profile.entityUuid.agents}
            </p>
          </div>
        )}
        {profile.entityUuid.maps && (
          <div className="p-4 border border-gray-300 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Map</h2>
            <p>
              <strong>UUID:</strong> {profile.entityUuid.maps}
            </p>
          </div>
        )}
        {profile.entityUuid.weapons && (
          <div className="p-4 border border-gray-300 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Weapon</h2>
            <p>
              <strong>UUID:</strong> {profile.entityUuid.weapons}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
