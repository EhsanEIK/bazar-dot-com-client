import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useModerator from '../../hooks/useModerator';
import Spinner from '../../Pages/Shared/Spinner/Spinner';

const ModeratorRoute = ({ children }) => {
    const { user, loading, logout } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const [isModerator, isModeratorLoading] = useModerator(user?.email);
    const location = useLocation();

    if (loading || isAdminLoading || isModeratorLoading) {
        return <Spinner></Spinner>
    }
    if ((user?.email && isAdmin) || (user?.email && isModerator)) {
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

export default ModeratorRoute;