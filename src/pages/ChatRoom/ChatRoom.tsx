import React, { useEffect, useRef } from 'react';
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

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

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
                            quotedMessage={msg.quotedMessage}
                            onQuoteMessage={handleQuoteMessage}
                        />
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <UserInput
                onSendMessage={(message: string) => handleSendMessage(message, username)}
                quotedMessage={quotedMessage}
            />
        </div>
    );
};

export default ChatRoom;
