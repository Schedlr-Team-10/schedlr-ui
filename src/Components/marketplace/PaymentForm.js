import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Make sure to initialize Stripe outside of a component’s render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe("your-stripe-public-key");

const PaymentForm = ({ amount }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return; // Stripe.js hasn't loaded yet

    setIsProcessing(true);

    // Create payment intent and get client secret (this would typically come from your server)
    const { error, paymentIntent } = await stripe.confirmCardPayment("your-client-secret", {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error(error);
      setErrorMessage("Payment failed! Please try again.");
    } else {
      alert("Payment Successful!");
    }
    setIsProcessing(false);
  };

  return (
    <div>
      <h3>Payment for Sponsored Post: ${amount}</h3>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default function WrappedPaymentForm({ amount }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm amount={amount} />
    </Elements>
  );
}
