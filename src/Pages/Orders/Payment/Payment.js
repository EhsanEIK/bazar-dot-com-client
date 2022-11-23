import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const order = useLoaderData();

    return (
        <div>
            <h1 className='text-2xl font-semibold mb-5'>Please Payment for {order.productName}</h1>
            <p>The amount is {order.price}</p>
        </div>
    );
};

export default Payment;