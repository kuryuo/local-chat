import { useState } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
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

        if (!username.trim() || !chatname.trim()) {
            setError('Имя и комната не могут быть пустыми или состоять только из пробелов');
            return;
        }

        if (username.length > 20 || chatname.length > 30) {
            setError('Имя не должно превышать 20 символов, а комната — 30');
            return;
        }

        const roomSafePattern = /^[a-zA-Zа-яА-ЯёЁ0-9-_]+$/;
        if (!roomSafePattern.test(chatname)) {
            setError('Название комнаты может содержать буквы (латиница и кириллица), цифры, тире и нижнее подчёркивание');
            return;
        }

        setError(null);
        saveParticipantToRoom(chatname, username);
        setStoredUsername(username);
        setStoredChatname(chatname);

        navigate(`/chat/${encodeURIComponent(chatname)}`);
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
