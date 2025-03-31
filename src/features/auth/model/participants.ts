import { getSessionUsername } from './session';

export function saveParticipantToRoom(chatname: string): void {
    const username = getSessionUsername();
    if (!username) return;

    const key = `participants_${chatname}`;
    const raw = localStorage.getItem(key);
    const participants = raw ? JSON.parse(raw) : [];

    if (!participants.includes(username)) {
        participants.push(username);
        localStorage.setItem(key, JSON.stringify(participants));
    }
}
