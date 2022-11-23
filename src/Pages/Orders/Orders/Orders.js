import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Orders = () => {
    const { data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async function () {
            const res = await fetch('http://localhost:5000/orders');
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <h1 className='text-2xl font-semibold mb-5'>All Orders</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, idx) =>
                                <tr key={order._id} className="hover">
                                    <th>{idx}</th>
                                    <td>{order.name}</td>
                                    <td>{order.product}</td>
                                    <td>{order.price}</td>
                                    <td>
                                        <button className='btn btn-primary btn-sm'>Payment</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;