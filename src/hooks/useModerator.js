import { useEffect, useState } from "react";

const useModerator = email => {
    const [isModerator, setIsModerator] = useState('');
    const [isModeratorLoading, setIsModeratorLoading] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:5000/users/Moderator/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsModerator(data.isModerator);
                setIsModeratorLoading(false);
            })
    }, [email])

    return [isModerator, isModeratorLoading];
}

export default useModerator;