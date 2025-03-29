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
    onOpenImage?: (url: string) => void;
    quotedMessage?: {
        userName: string;
        text: string;
        timestamp: number;
    };
    onQuoteMessage: (message: {
        userName: string;
        timestamp: number;
        text: string;
        fileId?: string | null;
        onOpenImage?: (url: string) => void;
        quotedMessage?: {
            userName: string;
            text: string;
            timestamp: number;
        };
    }) => void;
    onScrollToQuoted?: () => void;
}

export interface RoomHeaderProps {
    chatname: string;
    onLeaveRoom: () => void;
}
