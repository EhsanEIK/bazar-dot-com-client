import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const [errMsg, setErrMsg] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleAddProduct = (data, event) => {
        setErrMsg('');
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgBBAPIKey}`;

        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const imageURL = imageData.data.url;
                    const product = {
                        name: data.name,
                        price: data.price,
                        image: imageURL
                    };
                    fetch('http://localhost:5000/products', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(product),
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success('Product added successfully');
                                event.target.reset();
                            }
                        })
                }
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Add Product!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(handleAddProduct)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input {...register("name", { required: "Name must be required" })} type="text" placeholder="product name" className="input input-bordered" />
                            {errors.name && <p className='text-red-600 text-sm my-3'>{errors.name?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Price</span>
                            </label>
                            <input {...register("price", { required: "Price must be required" })} type="text" placeholder="product price" className="input input-bordered" />
                            {errors.price && <p className='text-red-600 text-sm my-3'>{errors.price?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Image</span>
                            </label>
                            <input {...register("image", {
                                required: 'Image must be required'
                            })} type="file" accept='image/*' />
                            {errors.image && <p className='text-red-600 text-sm my-3'>{errors.image?.message}</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Add Product</button>
                        </div>
                        <p className='text-red-600 text-sm text-center my-3'>{errMsg}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;