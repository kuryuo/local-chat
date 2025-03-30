import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RoomHeader.module.css';
import logo from '@/shared/assets/img/logo.svg';
import { RoomHeaderProps } from '@/features/chat/model/props';
import { ROUTES } from '@/shared/consts/const';
import Button from '@/shared/ui/Button/Button';

const RoomHeader: React.FC<RoomHeaderProps> = ({ chatname, onLeaveRoom }) => {
    const navigate = useNavigate();
    const [participants, setParticipants] = useState<string[]>([]);

    useEffect(() => {
        try {
            const storedParticipants = JSON.parse(localStorage.getItem(`participants_${chatname}`) || '[]');
            setParticipants(storedParticipants);
        } catch (error) {
            console.error('Ошибка при получении участников:', error);
            setParticipants([]);
        }
    }, [chatname]);

    const handleLeaveRoom = () => {
        onLeaveRoom();
        navigate(ROUTES.LOGIN);
    };

    return (
        <div className={styles.roomHeader}>
            <div className={styles.roomLeft}>
                <img src={logo} alt="Chat Icon" />
                <div className={styles.roomInfo}>
                    <h1 className={styles.roomName}>{chatname || 'Chat Room'}</h1>
                    <span className={styles.participants}>
            {participants.length > 0 ? participants.join(', ') : 'Нет участников'}
          </span>
                </div>
            </div>

            <Button label="Leave Room" onClick={handleLeaveRoom} />
        </div>
    );
};

export default RoomHeader;
