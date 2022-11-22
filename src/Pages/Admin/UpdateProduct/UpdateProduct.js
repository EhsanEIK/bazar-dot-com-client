import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';

const UpdateProduct = () => {
    const storedProduct = useLoaderData();
    const [errMsg, setErrMsg] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleUpdateProduct = (data, event) => {
        setErrMsg('');
        const product = { name: data.name, price: data.price };
        fetch(`http://localhost:5000/products/${storedProduct._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('bazarToken')}`,
            },
            body: JSON.stringify(product),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Product updated successfully');
                }
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Update Product: {storedProduct.name}</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(handleUpdateProduct)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input {...register("name", {
                                value: storedProduct.name,
                                required: "Name must be required"
                            })} type="text" placeholder="name" className="input input-bordered" />
                            {errors.name && <p className='text-red-600 text-sm my-3'>{errors.name?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Price</span>
                            </label>
                            <input {...register("price", {
                                value: storedProduct.price,
                                required: "Price must be required"
                            })} type="text" placeholder="email" className="input input-bordered" />
                            {errors.price && <p className='text-red-600 text-sm my-3'>{errors.price?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Image</span>
                            </label>
                            <input {...register("image")} type="file" accept='image/*' className="input input-bordered" />
                            {errors.image && <p className='text-red-600 text-sm my-3'>{errors.image?.message}</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Update Product</button>
                        </div>
                        <p className='text-red-600 text-sm text-center my-3'>{errMsg}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;