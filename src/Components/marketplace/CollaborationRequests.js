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
