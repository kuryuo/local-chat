import React from 'react';
import RoomHeader from '../../components/RoomHeader/RoomHeader';
import Message from '../../components/Message/Message';
import UserInput from '../../components/UserInput/UserInput';
import styles from './ChatRoom.module.css';

const ChatRoom: React.FC = () => {
    return (
        <div className={styles.chatRoom}>
            <RoomHeader />

            <div className={styles.messages}>
                <Message />
            </div>

            <UserInput />
        </div>
    );
};

export default ChatRoom;
