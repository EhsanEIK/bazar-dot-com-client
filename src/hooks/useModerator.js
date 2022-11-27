import { useEffect, useState } from "react";

const useModerator = email => {
    const [isModerator, setIsModerator] = useState('');
    const [isModeratorLoading, setIsModeratorLoading] = useState(true);
    useEffect(() => {
        fetch(`https://bazar-dot-com-server.vercel.app/users/Moderator/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsModerator(data.isModerator);
                setIsModeratorLoading(false);
            })
    }, [email])

    return [isModerator, isModeratorLoading];
}

export default useModerator;