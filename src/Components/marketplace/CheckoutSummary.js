import React from "react";

const CheckoutSummary = ({ amount, onConfirm }) => {
  return (
    <div className="checkout-summary">
      <h3>Checkout Summary</h3>
      <p>Your collaboration request has been received. Please confirm the payment details below:</p>
      <p>Total Amount: ${amount}</p>
      <button onClick={onConfirm}>Confirm Payment</button>
    </div>
  );
};

export default CheckoutSummary;
