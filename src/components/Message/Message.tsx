import React from 'react';
import styles from './Message.module.css';
import { MessageProps } from '../../types/types.ts';
import { formatTime } from '../../utils/utils.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import arrowIcon from '../../assets/img/arrow.svg';

const Message: React.FC<MessageProps> = ({
                                             userName,
                                             timestamp,
                                             text,
                                             quotedMessage,
                                             onQuoteMessage
                                         }) => {
    const [currentUser] = useLocalStorage<string>('username', '');
    const isCurrentUser = currentUser === userName;

    return (
        <div className={`${styles.message} ${isCurrentUser ? styles.messageRight : styles.messageLeft}`}>
            <div className={styles.header}>
                <span className={styles.userName}>{userName}</span>
            </div>

            {quotedMessage && (
                <div className={styles.quotedMessage}>
                    <p><strong>{quotedMessage.userName}:</strong> {quotedMessage.text}</p>
                </div>
            )}

            <div className={styles.text}>
                {text}
            </div>

            <div className={styles.timestamp}>
                {formatTime(timestamp)}
            </div>

            <img
                src={arrowIcon}
                alt="Quote"
                className={`${styles.quoteIcon} ${isCurrentUser ? styles.leftArrow : styles.rightArrow}`}
                onClick={() => onQuoteMessage({ userName, timestamp, text, quotedMessage })}
                style={{ transform: isCurrentUser ? 'scaleX(-1)' : 'scaleX(1)' }}
            />
        </div>
    );
};

export default Message;
