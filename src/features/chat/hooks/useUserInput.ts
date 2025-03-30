import { useState, useRef, useEffect } from 'react';
import { useEmojiPicker } from '@/shared/hooks/useEmojiPicker';
import { autoResizeTextarea } from '@/shared/utils/utils.ts';
import { UserInputProps } from '../model/props';

export function useUserInput(props: UserInputProps) {
    const {
        onSendMessage,
        onCancelQuote,
    } = props;

    const {
        showEmojiPicker,
        toggleEmojiPicker,
        message,
        setMessage,
        handleEmojiClick,
    } = useEmojiPicker();

    const [fileId, setFileId] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [toggleEmojiPicker]);

    const handleSend = () => {
        if (message.trim() || fileId) {
            onSendMessage(message, fileId);
            setMessage("");
            setFileId(null);
            setFileName(null);
        }
    };

    const handleCancelQuote = () => {
        setMessage("");
        onCancelQuote?.();
    };

    const handleCancelFile = () => {
        setFileId(null);
        setFileName(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return {
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
        emojiPickerRef
    };
}
