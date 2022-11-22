import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Product from './Product';

const Prodcuts = () => {
    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async function () {
            const res = await fetch('http://localhost:5000/products');
            const data = await res.json();
            return data;
        }
    })

    return (
        <div className='container mx-auto'>
            <h1 className='text-5xl text-center font-semibold mt-10 mb-5'>All Products</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default Prodcuts;