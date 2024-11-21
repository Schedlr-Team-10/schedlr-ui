import React, { useState } from "react";
import "./CollaborationRequests.css";

const CollaborationRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      customerName: "Ravi Shankar",
      proposal: "I want to collaborate with you for a new fitness product.",
      date: "2024-11-21T12:00:00Z",
      status: "Pending",
    },
    {
      id: 2,
      customerName: "Vamsi Muppana",
      proposal: "Let's create content for a fashion brand for my startup.",
      date: "2024-11-21T14:30:00Z",
      status: "Pending",
    },
    {
      id: 3,
      customerName: "Sindhu Sameera",
      proposal: "Collaborate for a travel and adventure campaign.",
      date: "2024-11-15T10:15:00Z",
      status: "Pending",
    },
    {
      id: 4,
      customerName: "Sarah Lee",
      proposal: "Let's work together on a tech gadget promotion.",
      date: "2024-11-12T09:00:00Z",
      status: "Pending",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("date");
  const [modalData, setModalData] = useState(null);

  // Handle Accept/Reject Action
  const handleAction = (id, action) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: action } : request
      )
    );
  };

  // Filter and Sort Requests
  const filteredRequests = requests
    .filter((request) =>
      filterStatus === "All" ? true : request.status === filterStatus
    )
    .filter((request) =>
      request.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "date") {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortOption === "name") {
        return a.customerName.localeCompare(b.customerName);
      }
      return 0;
    });

  // Open Modal
  const openModal = (data) => {
    setModalData(data);
  };

  // Close Modal
  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div className="cont">
      <h1 className="collaboration-requests-title">Collaboration Requests</h1>

      {/* Search and Filter Section */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by customer name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-dropdown"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="sort-dropdown"
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {/* Collaboration Requests */}
      {filteredRequests.length === 0 ? (
        <p className="no-requests">No collaboration requests found.</p>
      ) : (
        <div className="request-cards-container">
          {filteredRequests.map((request) => (
            <div key={request.id} className="request-card">
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
                  <p
                    className={`request-status ${request.status.toLowerCase()}-status`}
                  >
                    {request.status}
                  </p>
                )}
              </div>

              <button
                onClick={() => openModal(request)}
                className="details-button"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Request Details */}
      {modalData && (
        <div className="modal">
          <div className="modal-content">
            <h2>Request Details</h2>
            <p>
              <strong>Customer Name:</strong> {modalData.customerName}
            </p>
            <p>
              <strong>Proposal:</strong> {modalData.proposal}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(modalData.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong> {modalData.status}
            </p>
            <button onClick={closeModal} className="close-modal-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationRequests;
