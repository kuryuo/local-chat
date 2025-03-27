import { useLocalStorage } from './useLocalStorage';

export function useMessageSending(chatname: string) {
    const [messages, setMessages] = useLocalStorage<any[]>(`messages_${chatname}`, []);

    const handleSendMessage = (message: string, username: string) => {
        const newMessage = {
            userName: username,
            timestamp: Date.now(),
            text: message,
            mediaUrl: null,
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
    };

    return { messages, handleSendMessage };
}
