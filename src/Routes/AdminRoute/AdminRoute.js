import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading, logout } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div>Loading...</div>
    }
    if (user?.email && isAdmin) {
        return children;
    }
    return (
        <>
            {
                logout()
                    .then(() => toast.error("Log out for unauthorized access"))
                    .catch(err => console.error(err))
            }
            < Navigate to='/login' state={{ from: location }} replace></Navigate>
        </>
    )
};

export default AdminRoute;