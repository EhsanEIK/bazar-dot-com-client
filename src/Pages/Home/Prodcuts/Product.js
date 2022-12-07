import React from 'react';

const Product = ({ product, setOrderProduct }) => {
    const { name, image, price } = product;

    return (
        <div className="card card-compact md:w-96 w-full bg-base-100 shadow-xl">
            <figure><img className='w-48 h-52' src={image} alt={name} /></figure>
            <div className="card-body">
                <h2 className="text-3xl font-bold">{name}</h2>
                <p className='text-xl'>Price: ${price}</p>
                <div className="card-actions justify-end">
                    <label onClick={() => setOrderProduct(product)} htmlFor='confirmation-modal' className="btn btn-primary">Buy Now</label>
                </div>
            </div>
        </div>
    );
};

export default Product;