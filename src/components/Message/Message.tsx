import React from 'react';
import styles from './Message.module.css';
import {MessageProps} from "../../types/types.ts";
import {formatTime} from "../../utils/utils.ts";

const Message: React.FC<MessageProps> = ({ userName, timestamp, text, mediaUrl }) => {

    return (
        <div className={styles.message}>
            <div className={styles.header}>
                <span className={styles.userName}>{userName}</span>
                <span className={styles.timestamp}>{formatTime(timestamp)}</span>
            </div>
            <div className={styles.text}>
                {text}
            </div>
            {mediaUrl && (
                <div className={styles.media}>
                    <img src={mediaUrl} alt="media content" />
                </div>
            )}
        </div>
    );
};

export default Message;
