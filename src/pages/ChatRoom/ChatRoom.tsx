import React from 'react';
import RoomHeader from '../../components/RoomHeader/RoomHeader';
import Message from '../../components/Message/Message';
import UserInput from '../../components/UserInput/UserInput';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useMessageSending } from '../../hooks/useMessageSending';
import { ROUTES } from '../../constans/const.ts';
import styles from './ChatRoom.module.css';

const ChatRoom: React.FC = () => {
    const [username] = useLocalStorage<string>('username', '');
    const [chatname] = useLocalStorage<string>('chatname', '');

    const { messages, handleSendMessage, quotedMessage, handleQuoteMessage } = useMessageSending(chatname);

    const handleLeaveRoom = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('chatname');
        window.location.href = ROUTES.LOGIN;
    };

    return (
        <div className={styles.chatRoom}>
            <RoomHeader chatname={chatname} onLeaveRoom={handleLeaveRoom} />
            <div className={styles.messages}>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <Message
                            userName={msg.userName}
                            timestamp={msg.timestamp}
                            text={msg.text}
                            mediaUrl={msg.mediaUrl}
                            quotedMessage={msg.quotedMessage}
                        />
                        <button onClick={() => handleQuoteMessage(msg)}>
                            Quote
                        </button>
                    </div>
                ))}
            </div>
            <UserInput
                onSendMessage={(message: string) => handleSendMessage(message, username)}
                quotedMessage={quotedMessage}
            />
        </div>
    );
};

export default ChatRoom;
