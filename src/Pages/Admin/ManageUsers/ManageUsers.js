import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const ManageUsers = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch('http://localhost:5000/users')
            .then(res => res.json())
    })

    // make admin handler
    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/users/makeAdmin?email=${user?.email}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
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
        fetch(`http://localhost:5000/users/makeModerator?email=${user?.email}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
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
                                        {user?.role === 'admin' ?
                                            <label className='text-green-600 font-semibold'>Admin</label>
                                            :
                                            <button onClick={() => handleMakeAdmin(user)} className='btn btn-sm btn-primary'>Make Admin</button>
                                        }
                                    </td>
                                    <td>
                                        {
                                            user?.role === 'moderator' ?
                                                <label className='text-green-600 font-semibold'>Moderator</label>
                                                :
                                                <button onClick={() => handleMakeModerator(user)} className='btn btn-sm btn-warning'>Make Moderator</button>
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