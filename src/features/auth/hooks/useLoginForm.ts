import { useState } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/consts/const';
import { saveParticipantToRoom } from '../model/participants';

export function useLoginForm() {
    const [username, setUsername] = useState('');
    const [chatname, setChatname] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [, setStoredUsername] = useLocalStorage<string>('username', '');
    const [, setStoredChatname] = useLocalStorage<string>('chatname', '');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !chatname) {
            setError('Поля не должны быть пустыми');
            return;
        }

        setError(null);
        saveParticipantToRoom(chatname, username);
        setStoredUsername(username);
        setStoredChatname(chatname);
        navigate(ROUTES.CHAT);
    };

    return {
        username,
        setUsername,
        chatname,
        setChatname,
        error,
        handleSubmit
    };
}
