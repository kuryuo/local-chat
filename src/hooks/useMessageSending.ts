import { useLocalStorage } from './useLocalStorage';
import { useState } from 'react';
import {STORAGE_KEYS} from "../constans/const.ts";

export function useMessageSending(chatname: string) {
    const [messages, setMessages] = useLocalStorage<any[]>(STORAGE_KEYS.MESSAGES(chatname), []);
    const [quotedMessage, setQuotedMessage] = useState<any | null>(null);

    const handleSendMessage = async (message: string, fileId: string | null, username: string) => {

        const newMessage = {
            userName: username,
            timestamp: Date.now(),
            text: message,
            quotedMessage: quotedMessage || null,
            file: fileId,
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        setQuotedMessage(null);
    };

    const handleQuoteMessage = (message: any) => {
        setQuotedMessage(message);
    };

    return { messages, handleSendMessage, quotedMessage, handleQuoteMessage };
}
