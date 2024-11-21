// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CollaborationRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch collaboration requests
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get("/api/influencer/requests");
//         setRequests(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load requests.");
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleAction = async (id, action) => {
//     try {
//       const response = await axios.put(`/api/influencer/requests/${id}`, {
//         status: action,
//       });
//       // Update the UI
//       setRequests((prevRequests) =>
//         prevRequests.map((request) =>
//           request.id === id ? { ...request, status: response.data.status } : request
//         )
//       );
//     } catch (err) {
//       console.error("Error updating request:", err);
//     }
//   };

//   if (loading) return <div>Loading requests...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container px-4 py-6">
//       <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
//         Collaboration Requests
//       </h1>
//       {requests.length === 0 ? (
//         <p className="text-center text-xl text-gray-500">No collaboration requests found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {requests.map((request) => (
//             <div
//               key={request.id}
//               className="p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-200"
//             >
//               <h2 className="text-xl font-semibold text-gray-800">{request.customerName}</h2>
//               <p className="text-sm text-gray-600 mt-2">{request.proposal}</p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Received: {new Date(request.date).toLocaleDateString()}
//               </p>

//               <div className="mt-4">
//                 {request.status === "Pending" ? (
//                   <div className="flex space-x-4">
//                     <button
//                       onClick={() => handleAction(request.id, "Accepted")}
//                       className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition duration-150"
//                     >
//                       Accept
//                     </button>
//                     <button
//                       onClick={() => handleAction(request.id, "Rejected")}
//                       className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition duration-150"
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 ) : (
//                   <p
//                     className={`font-semibold mt-2 ${
//                       request.status === "Accepted" ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {request.status}
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CollaborationRequests;

import React, { useState } from "react";
import './CollaborationRequests.css';  // Import the CSS file

const CollaborationRequests = () => {
  // Static data for collaboration requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      customerName: "John Doe",
      proposal: "I want to collaborate with you for a new fitness product.",
      date: "2024-11-18T12:00:00Z",
      status: "Pending",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      proposal: "Let's create content for a fashion brand.",
      date: "2024-11-17T14:30:00Z",
      status: "Pending",
    },
    {
      id: 3,
      customerName: "Michael Brown",
      proposal: "Collaborate for a travel and adventure campaign.",
      date: "2024-11-15T10:15:00Z",
      status: "Accepted",
    },
    {
      id: 4,
      customerName: "Sarah Lee",
      proposal: "Let's work together on a tech gadget promotion.",
      date: "2024-11-12T09:00:00Z",
      status: "Rejected",
    },
  ]);
  
  const handleAction = (id, action) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: action } : request
      )
    );
  };

  return (
    <div className="cont">
    <div className="collaboration-requests">
      <h1 className="collaboration-requests-title">Collaboration Requests</h1>
      {requests.length === 0 ? (
        <p className="no-requests">No collaboration requests found.</p>
      ) : (
        <div className="request-cards-container">
          {requests.map((request) => (
            <div
              key={request.id}
              className="request-card"
            >
              <h2 className="request-customer-name">{request.customerName}</h2>
              <p className="request-proposal">{request.proposal}</p>
              <p className="request-date">
                Received: {new Date(request.date).toLocaleDateString()}
              </p>

              <div className="action-buttons">
                {request.status === "Pending" ? (
                  <div className="action-button-group">
                    <button
                      onClick={() => handleAction(request.id, "Accepted")}
                      className="action-button accept-button"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(request.id, "Rejected")}
                      className="action-button reject-button"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className={`request-status ${request.status.toLowerCase()}-status`}>
                    {request.status}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default CollaborationRequests;
