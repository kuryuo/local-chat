import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RoomHeader.module.css';
import logo from '../../assets/img/logo.svg';
import { RoomHeaderProps } from "../../types/types.ts";
import { ROUTES } from "../../constans/const.ts";
import Button from '../Button/Button';

const RoomHeader: React.FC<RoomHeaderProps> = ({ chatname, onLeaveRoom }) => {
    const navigate = useNavigate();

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
                    <span className={styles.participants}>5 participants</span>
                </div>
            </div>

            <Button
                label="Leave Room"
                onClick={handleLeaveRoom}
                variant="default"
            />
        </div>
    );
};

export default RoomHeader;
