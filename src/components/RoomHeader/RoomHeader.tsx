import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './RoomHeader.module.css';
import logo from '../../assets/logo.svg';

interface RoomHeaderProps {
    chatname: string;
    onLeaveRoom: () => void;
}

const RoomHeader: React.FC<RoomHeaderProps> = ({ chatname, onLeaveRoom }) => {
    const navigate = useNavigate();

    const handleLeaveRoom = () => {
        onLeaveRoom();
        navigate('/');
    };

    return (
        <div className={styles.roomHeader}>
            <div className={styles.roomLeft}>
                <img src={logo} alt="Chat Icon" />
                <div className={styles.roomInfo}>
                    <h1 className={styles.roomName}>{chatname || 'Chat Room'}</h1> {/* Показываем название комнаты */}
                    <span className={styles.participants}>5 participants</span>
                </div>
            </div>
            <button className={styles.leaveButton} onClick={handleLeaveRoom}>
                Leave Room
            </button>
        </div>
    );
};

export default RoomHeader;
