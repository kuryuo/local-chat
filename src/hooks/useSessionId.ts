import { useState, useEffect } from 'react';

const generateSessionId = () => {
    return `session-${Math.random().toString(36).substr(2, 9)}`;
};

const useSessionId = () => {
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        let id = sessionStorage.getItem('sessionId');

        if (!id) {
            id = generateSessionId();
            sessionStorage.setItem('sessionId', id);
        }

        localStorage.setItem('sessionId', id);

        setSessionId(id);
    }, []);

    return sessionId;
};

export default useSessionId;
