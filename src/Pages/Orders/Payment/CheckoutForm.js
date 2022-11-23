import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CheckoutForm = ({ order }) => {
    const { _id, email, price } = order;
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('');
    const [cardErrorMsg, setCardErrorMsg] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('bazarToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            setCardErrorMsg(card.message);
            return;
        }
        else {
            setCardErrorMsg('');
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });
        if (error) {
            setCardErrorMsg(card.message);
            return;
        }
        else {
            setCardErrorMsg('');
        }
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: email,
                    },
                },
            },
        );
        if (confirmError) {
            setCardErrorMsg(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            const payment = {
                email,
                price,
                transactionId: paymentIntent.id,
                orderId: _id,
            }
            fetch('http://localhost:5000/payments', {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('bazarToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success("Payment successful");
                        setTransactionId(paymentIntent.id);
                    }
                })
        }
        setProcessing(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-secondary btn-sm md:w-32 mt-5'
                    type="submit"
                    disabled={!stripe || !elements || processing}>
                    Pay
                </button>
            </form>
            <div>
                {
                    cardErrorMsg && <p className='text-red-600'>{cardErrorMsg}</p>
                }
                {
                    transactionId && <p>Transaction ID: {transactionId}</p>
                }
            </div>
        </div>
    );
};

export default CheckoutForm;