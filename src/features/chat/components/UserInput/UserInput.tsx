import React from "react";
import styles from "./UserInput.module.css";
import { BsEmojiSmile } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";
import QuotedMessage from "../QuotedMessage/QuotedMessage";
import FileInput from "../FileInput/FileInput";
import Button from "@/shared/ui/Button/Button";
import { useUserInput } from "../../hooks/useUserInput";
import { UserInputProps } from "../../model/props";

const UserInput: React.FC<UserInputProps> = (props) => {
    const {
        quotedMessage
    } = props;

    const {
        message,
        setMessage,
        showEmojiPicker,
        toggleEmojiPicker,
        handleEmojiClick,
        handleSend,
        handleKeyPress,
        handleCancelQuote,
        handleCancelFile,
        fileId,
        setFileId,
        fileName,
        setFileName,
        textAreaRef,
        fileInputRef,
        emojiPickerRef,
        error
    } = useUserInput(props);

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

                <FileInput
                    key={fileId || "new"}
                    setFileId={setFileId}
                    setFileName={setFileName}
                    ref={fileInputRef}
                />

                {fileName && (
                    <div className={styles.fileNameContainer}>
                        <span>{fileName}</span>
                        <button onClick={handleCancelFile} className={styles.cancelFileButton}>
                            <FiX size={12} />
                        </button>
                    </div>
                )}

                {error && <div className={styles.error}>{error}</div>}

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
