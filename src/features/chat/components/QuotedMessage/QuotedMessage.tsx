import React from 'react';
import styles from './QuotedMessage.module.css';
import type { QuotedMessage } from '../../model/message';

interface QuotedMessageProps {
    quotedMessage: QuotedMessage;
    maxLength?: number;
    onClick?: () => void;
}

const QuotedMessage: React.FC<QuotedMessageProps> = ({
                                                         quotedMessage,
                                                         maxLength = 5,
                                                         onClick,
                                                     }) => {
    const { userName, text } = quotedMessage;

    const truncatedText =
        text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

    return (
        <div
            className={styles.quotedMessage}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            <p>
                <strong>{userName}:</strong> {truncatedText}
            </p>
        </div>
    );
};

export default QuotedMessage;
