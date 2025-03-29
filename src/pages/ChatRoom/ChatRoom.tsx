import React, { useEffect, useRef, useState } from 'react';
import RoomHeader from '../../components/RoomHeader/RoomHeader';
import Message from '../../components/Message/Message';
import UserInput from '../../components/UserInput/UserInput';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useMessageSending } from '../../hooks/useMessageSending';
import { ROUTES, STORAGE_KEYS } from '../../constans/const.ts';
import useSessionId from '../../hooks/useSessionId';
import styles from './ChatRoom.module.css';

const ChatRoom: React.FC = () => {
    const [username] = useLocalStorage<string>(STORAGE_KEYS.USERNAME, '');
    const [chatname] = useLocalStorage<string>(STORAGE_KEYS.CHATNAME, '');
    const [modalImage, setModalImage] = useState<string | null>(null);

    const { messages, handleSendMessage, quotedMessage, handleQuoteMessage } = useMessageSending(chatname);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const sessionId = useSessionId();

    const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

            <div className={styles.sessionId}>
                <p>Идентификатор вашей сессии: {sessionId}</p>
            </div>

            <div className={styles.messages}>
                {messages.map((msg) => (
                    <div
                        key={msg.timestamp}
                        ref={(el) => {
                            messageRefs.current[msg.timestamp] = el;
                        }}
                    >
                        <Message
                            userName={msg.userName}
                            timestamp={msg.timestamp}
                            text={msg.text}
                            quotedMessage={msg.quotedMessage}
                            fileId={msg.file}
                            onQuoteMessage={handleQuoteMessage}
                            onScrollToQuoted={() => {
                                const quoted = msg.quotedMessage;
                                if (quoted && messageRefs.current[quoted.timestamp]) {
                                    messageRefs.current[quoted.timestamp]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                            }}
                            onOpenImage={(url) => setModalImage(url)}
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

            {modalImage && (
                <div className={styles.modalOverlay} onClick={() => setModalImage(null)}>
                    <img src={modalImage} alt="Full View" className={styles.modalImage} />
                </div>
            )}

        </div>
    );
};

export default ChatRoom;
