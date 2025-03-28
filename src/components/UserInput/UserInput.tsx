import React, { useEffect, useRef } from "react";
import { UserInputProps } from "../../types/types.ts";
import { useEmojiPicker } from "../../hooks/useEmojiPicker";
import FileInput from "../FileInput/FileInput";
import QuotedMessage from "../QuotedMessage/QuotedMessage";
import Button from "../Button/Button";
import styles from "./UserInput.module.css";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { autoResizeTextarea } from "../../utils/utils.ts";

const UserInput: React.FC<UserInputProps> = ({ onSendMessage, quotedMessage }) => {
    const {
        showEmojiPicker,
        message,
        setMessage,
        toggleEmojiPicker,
        handleEmojiClick,
    } = useEmojiPicker();

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        autoResizeTextarea(textAreaRef.current);
    }, [message]);

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
            {quotedMessage && <QuotedMessage quotedMessage={quotedMessage} />}

            <textarea
                className={styles.input}
                placeholder="Сообщение"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                ref={textAreaRef}
                rows={1}
            />

            <div className={styles.buttonGroup}>
                <button className={styles.emojiButton} onClick={toggleEmojiPicker}>
                    <BsEmojiSmile size={24} />
                </button>

                <FileInput />

                <Button label="Отправить" onClick={handleSend} />
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
