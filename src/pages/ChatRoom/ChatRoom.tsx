import React, { useEffect } from 'react';
import RoomHeader from '../../components/RoomHeader/RoomHeader';
import Message from '../../components/Message/Message';
import UserInput from '../../components/UserInput/UserInput';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ROUTES } from '../../constans/const.ts';
import styles from './ChatRoom.module.css';

const ChatRoom: React.FC = () => {
    const [username] = useLocalStorage<string>('username', '');
    const [chatname] = useLocalStorage<string>('chatname', '');
    const [messages, setMessages] = useLocalStorage<any[]>(`messages_${chatname}`, []);

    useEffect(() => {
        if (chatname) {
            const savedMessages = localStorage.getItem(`messages_${chatname}`);
            if (savedMessages) {
                setMessages(JSON.parse(savedMessages));
            }
        }
    }, [chatname]);

    const handleSendMessage = (message: string) => {
        const newMessage = {
            userName: username,
            timestamp: Date.now(),
            text: message,
            mediaUrl: null,
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
    };

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
                    <Message
                        key={index}
                        userName={msg.userName}
                        timestamp={msg.timestamp}
                        text={msg.text}
                        mediaUrl={msg.mediaUrl}
                    />
                ))}
            </div>
            <UserInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatRoom;
