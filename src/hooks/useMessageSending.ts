import { useLocalStorage } from './useLocalStorage';
import { useState } from 'react';

export function useMessageSending(chatname: string) {
    const [messages, setMessages] = useLocalStorage<any[]>(`messages_${chatname}`, []);
    const [quotedMessage, setQuotedMessage] = useState<any | null>(null);

    const handleSendMessage = (message: string, username: string) => {
        const newMessage = {
            userName: username,
            timestamp: Date.now(),
            text: message,
            quotedMessage: quotedMessage || null,
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
