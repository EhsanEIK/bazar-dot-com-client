import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (data, event) => {
        setErrMsg('');
        login(data.email, data.password)
            .then(result => {
                toast.success("Login successfully");
                event.target.reset();
                const user = { email: data.email };
                // get the jwt token
                fetch('https://bazar-dot-com-server.vercel.app/jwt', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('bazarToken', data.token);
                        navigate(from, { replace: true });
                    })
            })
            .catch(err => setErrMsg(err.message))
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(handleLogin)} className="card-body">
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
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p className='text-red-600 text-sm text-center my-3'>{errMsg}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;