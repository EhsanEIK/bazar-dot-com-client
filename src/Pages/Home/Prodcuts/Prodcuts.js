import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Product from './Product';

const Prodcuts = () => {
    const { user } = useContext(AuthContext);
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async function () {
            const res = await fetch('http://localhost:5000/products');
            const data = await res.json();
            return data;
        }
    })

    // set order product name
    const [orderProduct, setOrderProduct] = useState(null);

    // add order
    const handleAddOrder = product => {
        const order = {
            email: user?.email,
            productId: product._id,
            productName: orderProduct.name,
            price: orderProduct.price,
        }
        fetch('http://localhost:5000/orders', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Oder confirmed');
                }
            })
    }

    // close order confirmation modal
    const closeModal = () => {
        setOrderProduct(null);
    }

    return (
        <div className='container mx-auto'>
            <h1 className='text-5xl text-center font-semibold mt-10 mb-5'>All Products</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        setOrderProduct={setOrderProduct}></Product>)
                }
            </div>
            {
                orderProduct &&
                <ConfirmationModal
                    title={`Are you sure to purchase this ${orderProduct.name}`}
                    message=""
                    closeModal={closeModal}
                    btnName="Confirm"
                    btnAction={handleAddOrder}
                    dataModal={orderProduct}></ConfirmationModal>
            }
        </div>
    );
};

export default Prodcuts;