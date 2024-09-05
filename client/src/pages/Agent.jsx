import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Card from "../components/Card";

const Agent = () => {
  const [agents, setAgents] = useState([]);

  const fetchAgents = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/val/agents`);
      setAgents(response.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch agents", "error");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4 text-white">
        Agents List
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            id={agent.id}
            name={agent.name}
            image={agent.image}
            abilities={agent.abilities}
          />
        ))}
      </div>
    </div>
  );
};

export default Agent;
