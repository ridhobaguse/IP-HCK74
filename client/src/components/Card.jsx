// Card.jsx
import React from "react";
import { useHistory } from "react-router-dom";

const Card = ({ agent }) => {
  const history = useHistory();

  const cardStyle = {
    backgroundColor: "#1b2530",
    borderRadius: "8px",
    overflow: "hidden",
    width: "150px",
    textAlign: "center",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
  };

  const contentStyle = {
    padding: "10px",
  };

  const nameStyle = {
    fontSize: "1rem",
    marginTop: "8px",
    color: "white",
  };

  const handleCardClick = () => {
    history.push(`/agent/${agent.uuid}`);
  };

  return (
    <div style={cardStyle} onClick={handleCardClick}>
      <img src={agent.displayIcon} alt={agent.displayName} style={imageStyle} />
      <div style={contentStyle}>
        <h2 style={nameStyle}>{agent.displayName}</h2>
      </div>
    </div>
  );
};

export default Card;
