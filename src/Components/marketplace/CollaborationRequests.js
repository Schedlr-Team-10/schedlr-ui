import React, { useState, useEffect } from "react";
import "./CollaborationRequests.css";

const CollaborationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("date");
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state, setState]= useState(true);

  // Fetch requests from the backend
  useEffect(() => {
    const influencerId = localStorage.getItem("userId");
    if (!influencerId) {
      setError("User not logged in or influencerId missing");
      setLoading(false);
      return;
    }

    const fetchRequests = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_INTEGRATION_URL}/influencers/CollaborationReqs?influencerId=${influencerId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch collaboration requests");
        }
        const data = await response.json();
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, [state]);

  const handleAction = async (id, action) => {
    const influencerId = localStorage.getItem("userId"); // Get influencerId from localStorage
    const userId = id; // userId is the id of the request user
  
    console.log("userid is : "+userId);
    console.log("Influencerid is : "+ influencerId);
    console.log("Action is : "+ action);
  
    if (!influencerId) {
      setError("User not logged in or influencerId missing");
      return;
    }
  
    try {
      // Call the endpoint to change the status
      const response = await fetch(
        
        `${process.env.REACT_APP_API_INTEGRATION_URL}/influencers/changeStatus?userId=${userId}&influencerId=${influencerId}&status=${action}`,
        {
          method: "POST", // Assuming this is a POST request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update the status.");
      }else{
        setState(!state);
      }
  
      // Update the local state to reflect the status change
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.collaboration.id === id
            ? {
                ...request,
                collaboration: { ...request.collaboration, status: action },
              }
            : request
        )
      );
      
      // You can also add a console log to verify the updated state:
      console.log("Updated requests:", requests);
  
    } catch (err) {
      setError(err.message);
    }
  };
  
  

  // Filter and Sort Requests
  const filteredRequests = requests
    .filter((request) =>
      filterStatus === "All"
        ? true
        : request.collaboration.status === filterStatus
    )
    .filter((request) =>
      request.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "date") {
        return (
          new Date(b.collaboration.collaborationToken || Date.now()) -
          new Date(a.collaboration.collaborationToken || Date.now())
        );
      }
      if (sortOption === "name") {
        return a.username.localeCompare(b.username);
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

  // Loading and Error States
  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading requests...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      

      {/* Search and Filter Section */}
      <div className="flex justify-between mb-3">
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-64 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-5"
        />
        <div className="flex space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="All">All</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Collaboration Requests */}
      {filteredRequests.length === 0 ? (
        <p className="text-center text-xl">No collaboration requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((request) => (
            <div key={request.collaboration.id} className="bg-white p-6 rounded-lg shadow-lg border">
              <h2 className="text-2xl font-semibold">{request.username}</h2>
              <p className="text-sm text-gray-500">{request.collaboration.message}</p>

              <div className="mt-4 flex items-center justify-between">
                {request.collaboration.status === "PENDING" ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        handleAction(request.collaboration.userId, "ACCEPTED")
                      }
                      className="bg-green-500 text-white py-2 px-12 rounded-md hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleAction(request.collaboration.userId, "REJECTED")
                      }
                      className="bg-red-500 text-white py-2 px-12 rounded-md hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span
                    className={`${
                      request.collaboration.status === "ACCEPTED"
                        ? "text-green-500"
                        : "text-red-500"
                    } font-bold`}
                  >
                    {request.collaboration.status}
                  </span>
                )}
              </div>

              <button
                onClick={() => openModal(request)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Request Details */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Request Details</h2>
            <p>
              <strong>Customer Name:</strong> {modalData.username}
            </p>
            <p>
              <strong>Proposal:</strong> {modalData.collaboration.message}
            </p>
            <p>
              <strong>Status:</strong> {modalData.collaboration.status}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationRequests;
