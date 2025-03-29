import React, { useEffect, useRef } from 'react';
import RoomHeader from '../../components/RoomHeader/RoomHeader';
import Message from '../../components/Message/Message';
import UserInput from '../../components/UserInput/UserInput';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useMessageSending } from '../../hooks/useMessageSending';
import { ROUTES, STORAGE_KEYS } from '../../constans/const.ts';
import styles from './ChatRoom.module.css';

const ChatRoom: React.FC = () => {
    const [username] = useLocalStorage<string>(STORAGE_KEYS.USERNAME, '');
    const [chatname] = useLocalStorage<string>(STORAGE_KEYS.CHATNAME, '');

    const { messages, handleSendMessage, quotedMessage, handleQuoteMessage } = useMessageSending(chatname);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleLeaveRoom = () => {
        localStorage.removeItem(STORAGE_KEYS.USERNAME);
        localStorage.removeItem(STORAGE_KEYS.CHATNAME);
        window.location.href = ROUTES.LOGIN;
    };

    const handleCancelQuote = () => {
        handleQuoteMessage(null);
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
                            fileId={msg.file}
                            onQuoteMessage={handleQuoteMessage}
                        />
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <UserInput
                onSendMessage={(message: string, fileId: string | null) => handleSendMessage(message, fileId, username)}
                quotedMessage={quotedMessage}
                onCancelQuote={handleCancelQuote}
            />
        </div>
    );
};

export default ChatRoom;
