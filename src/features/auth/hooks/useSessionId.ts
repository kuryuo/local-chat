import { useEffect, useState } from 'react';
import { getSessionId } from '../model/session';

export function useSessionId(): string | null {
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        const id = getSessionId();
        setSessionId(id);
    }, []);

    return sessionId;
}
