import React, { useEffect, useRef } from "react";
import { UserInputProps } from "../../types/types.ts";
import { useEmojiPicker } from "../../hooks/useEmojiPicker";
import QuotedMessage from "../QuotedMessage/QuotedMessage";
import Button from "../Button/Button";
import styles from "./UserInput.module.css";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { autoResizeTextarea } from "../../utils/utils.ts";
import { FiX } from "react-icons/fi";

const UserInput: React.FC<UserInputProps> = ({ onSendMessage, quotedMessage, onCancelQuote }) => {
    const {
        showEmojiPicker,
        message,
        setMessage,
        toggleEmojiPicker,
        handleEmojiClick,
    } = useEmojiPicker();

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const emojiPickerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        autoResizeTextarea(textAreaRef.current);
    }, [message]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                toggleEmojiPicker();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [toggleEmojiPicker]);

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

    const handleCancelQuote = () => {
        setMessage("");
        if (onCancelQuote) {
            onCancelQuote();
        }
    };

    return (
        <div className={styles.userInput}>
            {quotedMessage && (
                <div className={styles.quotedMessageContainer}>
                    <QuotedMessage quotedMessage={quotedMessage} />
                    <button className={styles.cancelQuoteButton} onClick={handleCancelQuote}>
                        <FiX size={16} />
                    </button>
                </div>
            )}

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

                <Button label="Отправить" onClick={handleSend} />
            </div>

            {showEmojiPicker && (
                <div ref={emojiPickerRef} className={styles.emojiPicker}>
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    );
};

export default UserInput;
