import { useState } from "react";

export const useEmojiPicker = (initialState: boolean = false) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(initialState);
    const [message, setMessage] = useState("");

    const toggleEmojiPicker = () => {
        setShowEmojiPicker((prev) => !prev);
    };

    const handleEmojiClick = (emojiObject: any) => {
        setMessage((prev) => prev + emojiObject.emoji);
    };

    return {
        showEmojiPicker,
        message,
        setMessage,
        toggleEmojiPicker,
        handleEmojiClick,
    };
};
