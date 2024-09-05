// // masih coba coba

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const AgentDetail = () => {
//   const { id } = useParams();
//   const [agent, setAgent] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/api/valorant/agents/${id}`)
//       .then((response) => {
//         setAgent(response.data.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the agent details!", error);
//       });
//   }, [id]);

//   if (!agent) {
//     return <div>Loading...</div>;
//   }

//   const containerStyle = {
//     padding: "20px",
//     backgroundColor: "#0f1923",
//     color: "white",
//     textAlign: "center",
//   };

//   const imageStyle = {
//     width: "200px",
//     height: "auto",
//     marginBottom: "20px",
//   };

//   const detailStyle = {
//     backgroundColor: "#1b2530",
//     padding: "20px",
//     borderRadius: "8px",
//     display: "inline-block",
//     textAlign: "left",
//   };

//   const nameStyle = {
//     fontSize: "2rem",
//     marginBottom: "10px",
//   };

//   const descriptionStyle = {
//     fontSize: "1rem",
//   };

//   return (
//     <div style={containerStyle}>
//       <img src={agent.fullPortrait} alt={agent.displayName} style={imageStyle} />
//       <div style={detailStyle}>
//         <h2 style={nameStyle}>{agent.displayName}</h2>
//         <p style={descriptionStyle}>{agent.description}</p>
//       </div>
//     </div>
//   );
// };

// export default AgentDetail;
