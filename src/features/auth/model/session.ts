export const SESSION_USERNAME_KEY = 'username';

export function saveSessionUsername(username: string): void {
    sessionStorage.setItem(SESSION_USERNAME_KEY, username);
}

export function getSessionUsername(): string | null {
    return sessionStorage.getItem(SESSION_USERNAME_KEY);
}
