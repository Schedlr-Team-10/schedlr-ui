import { useEffect } from "react";
import axios from "axios";
import { PINTEREST_AUTH_CODE } from "./util/Constants";

const PinterestAccessStatus = () => {
  const getPInterestAccessTokenWithAuthcode = async (code, userId) => {
    try {
      console.log("Calling SPRING BOOT API");
      const response = await axios.post(PINTEREST_AUTH_CODE, {
        userId,
        code,
      });
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error sending code to backend:", error);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    getPInterestAccessTokenWithAuthcode(code, id);
  }, []);

  return (
    <div
      className="pinterest-status-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "linear-gradient(to bottom right, #facc15, #f472b6, #a855f7)", 
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#2d3748", 
      }}
    >
      <div
        className="pinterest-image-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          backgroundColor: "#ffffff", // White background
          borderRadius: "50%",
          padding: "15px",
          boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <img
          className="pinterest-status-image"
          src="https://media.istockphoto.com/id/2119163357/vector/loading-completed-abstract-approval-tick-icon.jpg?s=612x612&w=0&k=20&c=EMMzB3O48hSrxNFF17K3otNBbmgixeKSs_STXl5vG6k="
          alt="Success"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "10px",
          }}
        />
      </div>
      <div
        className="pinterest-message"
        style={{
          textAlign: "center",
          fontSize: "1.4rem",
          fontWeight: "bold",
          margin: "10px 20px",
          color: "#1a202c", // Darker gray text
        }}
      >
        <h4 style={{ margin: "0", color: "#2b6cb0" }}>Integration Successful!</h4>
        <p style={{ marginTop: "10px", color: "#4a5568" }}>
          Your Pinterest Account is now linked to our app.
        </p>
      </div>
    </div>
  );
};

export default PinterestAccessStatus;
