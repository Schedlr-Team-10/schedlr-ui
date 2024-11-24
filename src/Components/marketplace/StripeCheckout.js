import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./StripeCheckout.css";

const stripePromise = loadStripe("pk_test_51QMdkjDPmFCVYWzf3FxnEfsfq7mMm2uIrCHqIruPx1US3q74Lt3DZXyvMqRyZE6OF3DZZsQB8zVsfxMHJHiqhYw400yCubQU8r");


const StripeCheckout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [searchParams] = useSearchParams(); 
  const stripe = useStripe();
  const elements = useElements();

  const amount = searchParams.get("amount"); 
  const message = searchParams.get("message");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post("/payment/create-payment-intent", { amount });
        setClientSecret(response.data);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        // setPaymentError("Failed to create payment intent");
      }
    };

    if (amount) {
      createPaymentIntent();
    }
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setPaymentError(error.message);
    } else if (paymentIntent.status === "succeeded") {
      alert(`Payment successful!\nMessage: ${message}`); // Show the message after successful payment
    }
  };

  return (
    <div className="stripe-checkout-container">
      <h2>Enter Card Details for Payment</h2>
      <p className="checkout-message">Message: {message}</p>
      <p className="checkout-message">Amount: ${amount}</p>
      {paymentError && <p className="payment-error">{paymentError}</p>}
      <form onSubmit={handleSubmit} className="checkout-form">
        <CardElement className="stripe-card-element" />
        <button type="submit" className="submit-button" disabled={!stripe}>
          Pay ${amount}
        </button>
      </form>
    </div>
  );
};

const CheckoutForm = () => (
  <Elements stripe={stripePromise}>
    <StripeCheckout />
  </Elements>
);

export default CheckoutForm;
