import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleRegister = (data, event) => {
        setErrMsg('');
        const user = { name: data.name, email: data.email };

        createUser(data.email, data.password)
            .then(result => {
                // saved user info into the database
                fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            // get the jwt token
                            fetch('http://localhost:5000/jwt', {
                                method: "POST",
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(user)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    localStorage.setItem('bazarToken', data.token);
                                    toast.success("User created successfully");
                                    event.target.reset();
                                })
                        }
                    })
            })
            .catch(err => setErrMsg(err.message))
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(handleRegister)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("name", { required: "Name must be required" })} type="text" placeholder="name" className="input input-bordered" />
                            {errors.name && <p className='text-red-600 text-sm my-3'>{errors.name?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", { required: "Email must be required" })} type="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <p className='text-red-600 text-sm my-3'>{errors.email?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password", { required: "Password must be required" })} type="password" placeholder="password" className="input input-bordered" />
                            {errors.password && <p className='text-red-600 text-sm my-3'>{errors.password?.message}</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <p className='text-red-600 text-sm text-center my-3'>{errMsg}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;