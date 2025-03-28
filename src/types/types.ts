export interface UserInputProps {
    onSendMessage: (message: string) => void;
    quotedMessage?: {
        userName: string;
        text: string;
    };
}

export interface MessageProps {
    userName: string;
    timestamp: number;
    text: string;
    quotedMessage?: {
        userName: string;
        text: string;
    };
    onQuoteMessage: (message: {
        userName: string;
        timestamp: number;
        text: string;
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

// export interface FileInputProps {
//     onFileSelect: (file: File) => void;
// }