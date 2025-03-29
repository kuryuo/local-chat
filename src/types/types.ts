export interface UserInputProps {
    onSendMessage: (message: string, fileId: string | null) => void;
    quotedMessage?: {
        userName: string;
        text: string;
    };
    onCancelQuote?: () => void;
}

export interface MessageProps {
    userName: string;
    timestamp: number;
    text: string;
    fileId?: string | null;
    quotedMessage?: {
        userName: string;
        text: string;
    };
    onQuoteMessage: (message: {
        userName: string;
        timestamp: number;
        text: string;
        fileId?: string | null;
        quotedMessage?: {
            userName: string;
            text: string;
        };
    }) => void;
}

export interface RoomHeaderProps {
    chatname: string;
    onLeaveRoom: () => void;
}
