export interface UserInputProps {
    onSendMessage: (message: string, mediaUrl: string | null) => void;
    quotedMessage?: {
        userName: string;
        text: string;
    };
}


export interface MessageProps {
    userName: string;
    timestamp: number;
    text: string;
    mediaUrl?: string;
    quotedMessage?: {
        userName: string;
        text: string;
    };
}

export interface RoomHeaderProps {
    chatname: string;
    onLeaveRoom: () => void;
}

export interface FileInputProps {
    onFileSelect: (file: File) => void;
}