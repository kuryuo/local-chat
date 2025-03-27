import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { UserInputProps } from "../../types/types.ts";
import { BsEmojiSmile } from "react-icons/bs";
import styles from "./UserInput.module.css";

const UserInput: React.FC<UserInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Отменяет перенос строки и отправляет сообщение
            handleSend();
        }
    };

    const handleEmojiClick = (emojiObject: any) => {
        setMessage((prev) => prev + emojiObject.emoji);
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker((prev) => !prev);
    };

    return (
        <div className={styles.userInput}>
            <textarea
                className={styles.input}
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress} // Меняем на onKeyDown для Enter + Shift
                rows={1} // Начальное количество строк
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
