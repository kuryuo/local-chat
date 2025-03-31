import React, { useEffect, useState } from 'react';
import styles from './Message.module.css';
import { ChatMessage, QuotedMessage } from '../../model/message';
import { formatTime } from '@/shared/utils/utils';
import { getFile } from '@/db';
import arrowIcon from '@/shared/assets/img/arrow.svg';
import { getSessionUsername } from '@/features/auth/model/session';

interface MessageProps extends ChatMessage {
    onQuoteMessage: (message: QuotedMessage) => void;
    onScrollToQuoted?: () => void;
    onOpenImage?: (url: string) => void;
}

const Message: React.FC<MessageProps> = ({
                                             userName,
                                             timestamp,
                                             text,
                                             fileId,
                                             quotedMessage,
                                             onQuoteMessage,
                                             onScrollToQuoted,
                                             onOpenImage,
                                         }) => {
    const currentUser = getSessionUsername();
    const [fileData, setFileData] = useState<File | null>(null);

    const isCurrentUser = currentUser === userName;

    useEffect(() => {
        if (!fileId) return;
        getFile(fileId)
            .then((file) => {
                setFileData(file);
            })
            .catch((err) => console.error('Error loading file:', err));
    }, [fileId]);


    const renderMediaContent = () => {
        if (!fileData) return null;

        const url = URL.createObjectURL(fileData);

        if (fileData.type.startsWith('image/')) {
            return (
                <img
                    src={url}
                    alt="Image"
                    className={styles.mediaImage}
                    onClick={() => onOpenImage?.(url)}
                />
            );
        }

        if (fileData.type.startsWith('video/')) {
            return (
                <video controls className={styles.mediaVideo}>
                    <source src={url} />
                </video>
            );
        }

        return null;
    };

    return (
        <div className={`${styles.message} ${isCurrentUser ? styles.messageRight : styles.messageLeft}`}>
            <div className={styles.header}>
                <span className={styles.userName}>{userName}</span>
            </div>

            {quotedMessage && (
                <div className={styles.quotedMessage} onClick={onScrollToQuoted}>
                    <p><strong>{quotedMessage.userName}:</strong> {quotedMessage.text}</p>
                </div>
            )}

            <div className={styles.text}>{text}</div>

            {renderMediaContent()}

            <div className={styles.timestamp}>{formatTime(timestamp)}</div>

            <img
                src={arrowIcon}
                alt="Quote"
                className={`${styles.quoteIcon} ${isCurrentUser ? styles.leftArrow : styles.rightArrow}`}
                onClick={() =>
                    onQuoteMessage({
                        userName,
                        timestamp,
                        text,
                        ...(quotedMessage && { quotedMessage }),
                    })
                }
            />
        </div>
    );
};

export default Message;
