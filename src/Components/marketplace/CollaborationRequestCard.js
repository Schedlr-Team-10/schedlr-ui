import React from "react";

const CollaborationRequestCard = ({ request, onAccept, onReject }) => {
  return (
    <div className="collaboration-request-card">
      <h3>Collaboration Request from {request.userName}</h3>
      <p>{request.message}</p>
      <div className="actions">
        <button onClick={() => onAccept(request.id)} className="accept-button">
          Accept
        </button>
        <button onClick={() => onReject(request.id)} className="reject-button">
          Reject
        </button>
      </div>
    </div>
  );
};

export default CollaborationRequestCard;
