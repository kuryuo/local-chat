import React from 'react';
import styles from './QuotedMessage.module.css';

interface QuotedMessageProps {
    quotedMessage: { userName: string; text: string };
}

const QuotedMessage: React.FC<QuotedMessageProps> = ({ quotedMessage }) => {
    return (
        <div className={styles.quotedMessage}>
            <p><strong>{quotedMessage.userName}:</strong> {quotedMessage.text}</p>
        </div>
    );
};

export default QuotedMessage;
