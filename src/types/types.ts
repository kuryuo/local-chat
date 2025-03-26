export interface UserInputProps {
    onSendMessage: (message: string) => void;
}

export interface MessageProps {
    userName: string;
    timestamp: number;
    text: string;
    mediaUrl?: string;
}