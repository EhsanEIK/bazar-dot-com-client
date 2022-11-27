import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';

const ManageUsers = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch('https://bazar-dot-com-server.vercel.app/users', {
            headers: {
                authorization: `bearer ${localStorage.getItem('bazarToken')}`,
            }
        })
            .then(res => res.json())
    })

    // make admin handler
    const handleMakeAdmin = user => {
        fetch(`https://bazar-dot-com-server.vercel.app/users/makeAdmin?email=${user?.email}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('bazarToken')}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Make admin successfully");
                    refetch();
                }
            })
    }

    // make moderator handler
    const handleMakeModerator = user => {
        fetch(`https://bazar-dot-com-server.vercel.app/users/makeModerator?email=${user?.email}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('bazarToken')}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Make moderator successfully");
                    refetch();
                }
            })
    }

    return (
        <div>
            <h1 className='text-2xl font-semibold mb-5'>All Products</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) =>
                                <tr key={user._id}>
                                    <th>{i + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {
                                            isAdmin && (
                                                user?.role === 'admin' ?
                                                    <label className='text-green-600 font-semibold'>Admin</label>
                                                    :
                                                    <button onClick={() => handleMakeAdmin(user)} className='btn btn-sm btn-primary'>Make Admin</button>
                                            )
                                        }
                                    </td>
                                    <td>
                                        {
                                            isAdmin && (
                                                user?.role === 'moderator' ?
                                                    <label className='text-green-600 font-semibold'>Moderator</label>
                                                    :
                                                    <button onClick={() => handleMakeModerator(user)} className='btn btn-sm btn-warning'>Make Moderator</button>
                                            )
                                        }
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;