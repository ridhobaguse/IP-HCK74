import React from "react";

const Card = ({ id, name, image, abilities, role }) => {
  return (
    <div
      key={id}
      className="p-4 border border-gray-300 rounded-lg shadow-md bg-[#4a272a] text-white"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{name}</h2>
        {role && (
          <div className="flex items-center ml-4">
            <img
              src={role.displayIcon}
              alt={role.displayName}
              className="inline-block w-6 h-6 mr-2"
            />
            <span>{role.displayName}</span>
          </div>
        )}
      </div>
      <img
        src={image}
        alt={name}
        className="w-full h-auto rounded-lg mt-2 mb-4"
      />
      {abilities && (
        <div>
          <h3 className="font-medium">Abilities:</h3>
          <ul className="list-disc pl-5">
            {abilities.map((ability, index) => (
              <li key={index}>
                <img
                  src={ability.displayIcon}
                  alt={ability.displayName}
                  className="inline-block w-6 h-6 mr-2"
                />
                {ability.displayName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Card;
