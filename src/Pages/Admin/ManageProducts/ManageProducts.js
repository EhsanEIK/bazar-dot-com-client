import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageProducts = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async function () {
            const res = await fetch('https://bazar-dot-com-server.vercel.app/products', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('bazarToken')}`,
                }
            });
            const data = await res.json();
            return data;
        }
    })

    const [product, setProduct] = useState('');
    const handleSetProduct = product => {
        setProduct(product);
    }

    const closeModal = () => {
        setProduct(null);
    }

    const handleDelete = product => {
        fetch(`https://bazar-dot-com-server.vercel.app/products/${product._id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('bazarToken')}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success(`${product.name} product deleted successfully.`);
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
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) =>
                                <tr key={product._id} className="hover">
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-20 mask mask-square">
                                                <img src={product.image} alt={product.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <Link to={`/admin/updateProduct/${product._id}`}>
                                            <button className='btn btn-sm btn-primary w-full'>Edit</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <label
                                            onClick={() => handleSetProduct(product)}
                                            htmlFor="confirmation-modal" className='btn btn-sm btn-secondary w-full'
                                            disabled={!isAdmin}>Delete</label>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                product &&
                <ConfirmationModal
                    title={`Are you sure to delete ${product.name}?`}
                    message="After deleting it can't be undone."
                    btnName="Delete"
                    btnAction={handleDelete}
                    dataModal={product}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </div >
    );
};

export default ManageProducts;