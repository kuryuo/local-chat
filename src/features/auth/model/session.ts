export const SESSION_ID_KEY = 'sessionId';

export function generateSessionId(): string {
    return `session-${Math.random().toString(36).substr(2, 9)}`;
}

export function getSessionId(): string {
    let id = sessionStorage.getItem(SESSION_ID_KEY);

    if (!id) {
        id = generateSessionId();
        sessionStorage.setItem(SESSION_ID_KEY, id);
    }

    localStorage.setItem(SESSION_ID_KEY, id);
    return id;
}
