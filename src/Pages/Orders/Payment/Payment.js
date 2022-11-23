import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
    const order = useLoaderData();
    const stripePromise = loadStripe(process.env.REACT_APP_StripePk);

    return (
        <div>
            <h1 className='text-2xl font-semibold mb-5'>Please Payment for {order.productName}</h1>
            <p>The amount is {order.price}</p>
            <div className='w-96 my-10'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        order={order} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;