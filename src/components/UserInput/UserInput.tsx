import React, { useState } from "react";
import { UserInputProps } from "../../types/types.ts";
import { useEmojiPicker } from "../../hooks/useEmojiPicker";
import FileInput from "../FileInput/FileInput";
import QuotedMessage from "../QuotedMessage/QuotedMessage";
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

    const [mediaUrl, setMediaUrl] = useState<string | null>(null);

    const handleSend = () => {
        if (message.trim() || mediaUrl) {
            onSendMessage(message, mediaUrl);
            setMessage("");
            setMediaUrl(null);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileSelect = (file: File) => {
        const fileUrl = URL.createObjectURL(file);
        setMediaUrl(fileUrl);
    };

    return (
        <div className={styles.userInput}>
            {quotedMessage && <QuotedMessage quotedMessage={quotedMessage} />}

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

            <FileInput onFileSelect={handleFileSelect} />

            {showEmojiPicker && (
                <div className={styles.emojiPicker}>
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    );
};

export default UserInput;
