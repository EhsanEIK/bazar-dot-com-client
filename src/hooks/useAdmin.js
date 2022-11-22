import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState('');
    const [isAdminLoading, setIsAdminLoding] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:5000/users/admin/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data.isAdmin);
                setIsAdminLoding(false);
            })
    }, [email])

    return [isAdmin, isAdminLoading];
}

export default useAdmin;