import React, { useState } from "react";

const RequestCollaborationForm = ({ influencerId }) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle the request submission here (e.g., send a request to the backend)
    console.log(`Collaboration request sent to influencer ${influencerId} with message: ${message}`);
    // Reset after submission
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <div>
      <h3>Request Collaboration</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message to the influencer"
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Send Request"}
        </button>
      </form>
    </div>
  );
};

export default RequestCollaborationForm;
