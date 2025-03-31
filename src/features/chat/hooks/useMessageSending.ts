import { useState } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/shared/consts/const';
import { ChatMessage, QuotedMessage, createMessage } from '../model/message';

export function useMessageSending(chatname: string) {
    const [messages, setMessages] = useLocalStorage<ChatMessage[]>(STORAGE_KEYS.MESSAGES(chatname), []);
    const [quotedMessage, setQuotedMessage] = useState<QuotedMessage | null>(null);

    const handleSendMessage = (message: string, fileId: string | null, username: string) => {
        const newMessage = createMessage(message, fileId, username, quotedMessage || undefined);
        setMessages([...messages, newMessage]);
        setQuotedMessage(null);
    };

    const handleQuoteMessage = (message: QuotedMessage | null) => {
        setQuotedMessage(message);
    };

    return { messages,setMessages ,handleSendMessage, quotedMessage, handleQuoteMessage };
}
