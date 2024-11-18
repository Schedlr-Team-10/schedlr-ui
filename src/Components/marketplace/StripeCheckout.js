import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Load the Stripe publishable key
const stripePromise = loadStripe('your_publishable_key_here'); // Replace with your Stripe publishable key

const StripeCheckout = () => {
    const [clientSecret, setClientSecret] = useState('');
    const [amount, setAmount] = useState(0);  // Amount in dollars
    const [paymentError, setPaymentError] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    // Create Payment Intent when the component mounts
    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                // Send amount to backend to create PaymentIntent
                const response = await axios.post('/payment/create-payment-intent', { amount });
                setClientSecret(response.data);
            } catch (error) {
                console.error('Error creating payment intent:', error);
                setPaymentError('Failed to create payment intent');
            }
        };

        if (amount > 0) {
            createPaymentIntent();
        }
    }, [amount]);

    // Handle form submission to confirm the payment
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        // Confirm the Payment Intent with the card element
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            setPaymentError(error.message);
        } else if (paymentIntent.status === 'succeeded') {
            alert('Payment successful!');
        }
    };

    return (
        <div>
            <h2>Stripe Checkout</h2>
            {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="amount">Amount (in dollars):</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="1"
                    placeholder="Enter amount"
                />
                <div>
                    <CardElement />
                </div>
                <button type="submit" disabled={!stripe}>
                    Pay Now
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
