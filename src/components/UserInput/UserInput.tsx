import React from "react";
import { UserInputProps } from "../../types/types.ts";
import { useEmojiPicker } from "../../hooks/useEmojiPicker";
import styles from "./UserInput.module.css";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";

const UserInput: React.FC<UserInputProps> = ({ onSendMessage, quotedMessage }) => {
    const {
        showEmojiPicker,
        message,
        setMessage,
        toggleEmojiPicker,
        handleEmojiClick,
    } = useEmojiPicker();

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={styles.userInput}>
            {quotedMessage && (
                <div className={styles.quotedMessage}>
                    <p><strong>{quotedMessage.userName}:</strong> {quotedMessage.text}</p>
                </div>
            )}
            <textarea
                className={styles.input}
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                rows={1}
            />
            <div className={styles.buttonGroup}>
                <button className={styles.emojiButton} onClick={toggleEmojiPicker}>
                    <BsEmojiSmile size={24} />
                </button>

                <button className={styles.sendButton} onClick={handleSend}>
                    Send
                </button>
            </div>

            {showEmojiPicker && (
                <div className={styles.emojiPicker}>
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    );
};

export default UserInput;
