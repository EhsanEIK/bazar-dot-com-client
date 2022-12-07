import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const AdminLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);

    return (
        <div className="drawer drawer-mobile">
            <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className='m-10 mb-0'>
                    <Outlet></Outlet>
                </div>
                {/* footer */}
                <footer className="bg-base-300 text-base-content container mx-auto p-8 mt-28">
                    <p className='text-center text-lg text-slate-600'>
                        &copy; 2022 - Developed by <a href="https://www.linkedin.com/in/ehsanulislamkhan/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 font-bold text-decoration-none">Ehsan</a>
                    </p>
                </footer>
                <label htmlFor="admin-drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div >
            <div className="drawer-side border-r-2 border-gray-300 shadow-xl">
                <label htmlFor="admin-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 text-base-content">
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/admin/manageUsers'>Manage Users</Link></li>
                    <li><Link to='/admin/manageProducts'>Manage Products</Link></li>
                    {
                        isAdmin &&
                        <li><Link to='/admin/addProduct'>Add Product</Link></li>
                    }
                </ul>
            </div>
        </div >
    );
};

export default AdminLayout;