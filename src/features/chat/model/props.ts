import type { QuotedMessage } from './message';

export interface UserInputProps {
    onSendMessage: (message: string, fileId: string | null) => void;
    quotedMessage?: QuotedMessage | null;
    onCancelQuote?: () => void;
}

export interface RoomHeaderProps {
    chatname: string;
    onLeaveRoom: () => void;
}
