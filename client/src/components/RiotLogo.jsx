import React from "react";
import riotLogo from "../assets/riot2.png";

const RiotLogo = () => {
  return (
    <div className="absolute top-1 left-4">
      <img src={riotLogo} alt="Riot Games Logo" className="h-20 w-auto" />
    </div>
  );
};

export default RiotLogo;
