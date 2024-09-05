// // masih coba coba
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Card from "../components/Card";

// const Agent = () => {
//   const [agents, setAgents] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/valorant/agents")
//       .then((response) => {
//         setAgents(response.data.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the agents!", error);
//       });
//   }, []);

//   const containerStyle = {
//     padding: "20px",
//     backgroundColor: "#0f1923",
//     color: "white",
//     textAlign: "center",
//   };

//   const titleStyle = {
//     fontSize: "3rem",
//     marginBottom: "20px",
//   };

//   const gridStyle = {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
//     gap: "20px",
//     justifyItems: "center",
//   };

//   return (
//     <div style={containerStyle}>
//       <h1 style={titleStyle}>AGENT</h1>
//       <div style={gridStyle}>
//         {agents.map((agent) => (
//           <Card key={agent.uuid} agent={agent} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Agent;
