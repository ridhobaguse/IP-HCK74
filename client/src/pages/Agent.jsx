import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Card from "../components/Card";
import SearchForm from "../components/SearchForm";

const Agent = () => {
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-5xl font-bold mt-5 mb-4 text-black">
        AGENTS LIST
      </h1>

      <div className="flex justify-center mb-6">
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {filteredAgents.map((agent) => (
          <Card
            key={agent.id}
            id={agent.id}
            name={agent.name}
            image={agent.image}
            abilities={agent.abilities}
            role={agent.role}
          />
        ))}
      </div>
    </div>
  );
};

export default Agent;
