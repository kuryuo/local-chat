import React, { useEffect, useState } from 'react';
import styles from './Message.module.css';
import { MessageProps } from '../../types/types.ts';
import { formatTime } from '../../utils/utils.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { getFile } from '../../db.ts';
import arrowIcon from '../../assets/img/arrow.svg';

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
    const [currentUser] = useLocalStorage<string>('username', '');
    const [fileData, setFileData] = useState<File | null>(null);

    const isCurrentUser = currentUser === userName;

    useEffect(() => {
        const loadFile = async () => {
            if (fileId) {
                const fileFromDB = await getFile(fileId);
                setFileData(fileFromDB);
            }
        };
        loadFile();
    }, [fileId]);

    const renderMediaContent = (file: File | null) => {
        if (!file) return null;

        if (file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            return (
                <img
                    src={imageUrl}
                    alt="Message Media"
                    className={styles.mediaImage}
                    onClick={() => onOpenImage?.(imageUrl)}
                    style={{ cursor: 'zoom-in' }}
                />
            );
        }

        if (file.type.startsWith('video/')) {
            return (
                <video controls className={styles.mediaVideo}>
                    <source src={URL.createObjectURL(file)} />
                    Ваш браузер не поддерживает видео.
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
                <div
                    className={styles.quotedMessage}
                    onClick={onScrollToQuoted}
                    style={{ cursor: 'pointer' }}
                >
                    <p><strong>{quotedMessage.userName}:</strong> {quotedMessage.text}</p>
                </div>
            )}

            <div className={styles.text}>
                {text}
            </div>

            {renderMediaContent(fileData)}

            <div className={styles.timestamp}>
                {formatTime(timestamp)}
            </div>

            <img
                src={arrowIcon}
                alt="Quote"
                className={`${styles.quoteIcon} ${isCurrentUser ? styles.leftArrow : styles.rightArrow}`}
                onClick={() => onQuoteMessage({ userName, timestamp, text, quotedMessage })}
            />
        </div>
    );
};

export default Message;
