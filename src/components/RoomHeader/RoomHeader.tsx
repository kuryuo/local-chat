import React from 'react';
import styles from './RoomHeader.module.css';
import logo from '../../assets/logo.svg';

const RoomHeader: React.FC = () => {
    return (
        <div className={styles.roomHeader}>
            <div className={styles.roomLeft}>
                <img src={logo} alt="Chat Icon" />
                <div className={styles.roomInfo}>
                    <h1 className={styles.roomName}>Chat Room</h1>
                    <span className={styles.participants}>5 participants</span>
                </div>
            </div>
            <button className={styles.leaveButton}>Leave Room</button>
        </div>

    );
};

export default RoomHeader;
