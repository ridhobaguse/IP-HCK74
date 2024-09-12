import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Card from "../components/Card";
import SearchForm from "../components/SearchForm";
import Pagination from "../components/Pagination";

const Agent = () => {
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [agentsPerPage] = useState(10);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const fetchAgents = async () => {
    try {
      const response = await axios.get(
        `https://valcom.ekasanjaya.my.id/val/agents`
      );
      setAgents(response.data);

      // Extract unique roles with icons from agents
      const uniqueRoles = [
        ...new Map(
          response.data.map((agent) => [
            agent.role?.displayName,
            agent.role?.displayIcon,
          ])
        ),
      ].filter(([name, icon]) => name && icon);

      setRoles(uniqueRoles);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch agents", "error");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleRoleClick = (role) => {
    // Toggle the selected role
    setSelectedRole(selectedRole === role ? "" : role);
    setCurrentPage(1); // Reset to first page when a new role is selected
  };

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole
      ? agent.role?.displayName === selectedRole
      : true;
    return matchesSearch && matchesRole;
  });

  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = filteredAgents.slice(
    indexOfFirstAgent,
    indexOfLastAgent
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-5xl font-bold mt-5 mb-4 text-black">
        AGENTS LIST
      </h1>

      <div className="flex justify-center mb-6">
        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="flex flex-wrap justify-center mb-6 gap-4">
        {roles.map(([roleName, roleIcon], index) => (
          <img
            key={index}
            src={roleIcon}
            alt={roleName}
            onClick={() => handleRoleClick(roleName)}
            className={`w-12 h-12 cursor-pointer border-2 rounded-full ${
              selectedRole === roleName ? "border-blue-500" : "border-gray-300"
            }`}
            style={{
              filter: "grayscale(10%) brightness(0) invert(0)",
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {currentAgents.map((agent) => (
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

      <Pagination
        agentsPerPage={agentsPerPage}
        totalAgents={filteredAgents.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Agent;
