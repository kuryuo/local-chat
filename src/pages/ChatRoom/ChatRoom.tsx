import React, { useEffect, useState, useRef } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useMessageSending } from '@/features/chat/hooks/useMessageSending';
import { useParams } from 'react-router-dom';
import { ROUTES, STORAGE_KEYS } from '@/shared/consts/const';
import RoomHeader from '@/features/chat/components/RoomHeader/RoomHeader';
import UserInput from '@/features/chat/components/UserInput/UserInput';
import Message from '@/features/chat/components/Message/Message';
import styles from './ChatRoom.module.css';

import { getSessionUsername } from '@/features/auth/model/session';
import { saveParticipantToRoom } from '@/features/auth/model/participants';

const ChatRoom: React.FC = () => {
    const { chatname: routeChatname } = useParams<{ chatname: string }>();
    const [storedChatname] = useLocalStorage<string>(STORAGE_KEYS.CHATNAME, '');

    const chatname = routeChatname || storedChatname;
    const username = getSessionUsername() || 'Аноним';
    const [modalImage, setModalImage] = useState<string | null>(null);

    const {
        messages,
        setMessages,
        handleSendMessage,
        quotedMessage,
        handleQuoteMessage
    } = useMessageSending(chatname);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    useEffect(() => {
        const syncMessages = (e: StorageEvent) => {
            if (e.key === STORAGE_KEYS.MESSAGES(chatname) && e.newValue) {
                try {
                    const updatedMessages = JSON.parse(e.newValue);
                    setMessages(updatedMessages);
                } catch (err) {
                    console.warn('Ошибка при синхронизации сообщений между вкладками:', err);
                }
            }
        };
        window.addEventListener('storage', syncMessages);
        return () => {
            window.removeEventListener('storage', syncMessages);
        };
    }, [chatname, setMessages]);

    useEffect(() => {
        saveParticipantToRoom(chatname);
    }, [chatname]);

    const handleLeaveRoom = () => {
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
                            fileId={msg.fileId}
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
                onSendMessage={(message: string, fileId: string | null) =>
                    handleSendMessage(message, fileId, username)
                }
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
