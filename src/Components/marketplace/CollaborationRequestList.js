import React from "react";
import CollaborationRequestCard from "./CollaborationRequestCard";

const CollaborationRequestList = ({ requests, onAccept, onReject }) => {
  return (
    <div className="collaboration-request-list">
      <h3>Collaboration Requests</h3>
      {requests.length === 0 ? (
        <p>No collaboration requests yet.</p>
      ) : (
        requests.map((request) => (
          <CollaborationRequestCard
            key={request.id}
            request={request}
            onAccept={onAccept}
            onReject={onReject}
          />
        ))
      )}
    </div>
  );
};

export default CollaborationRequestList;
