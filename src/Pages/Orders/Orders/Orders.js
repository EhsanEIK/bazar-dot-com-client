import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Orders = () => {
    const { user } = useContext(AuthContext);

    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async function () {
            const res = await fetch(`http://localhost:5000/orders?email=${user?.email}`);
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
                            <th>Email</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, idx) =>
                                <tr key={order._id} className="hover">
                                    <th>{idx + 1}</th>
                                    <td>{order.email}</td>
                                    <td>{order.productName}</td>
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