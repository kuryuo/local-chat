export interface QuotedMessage {
    userName: string;
    text: string;
    timestamp: number;
}

export interface ChatMessage {
    userName: string;
    timestamp: number;
    text: string;
    fileId?: string | null;
    quotedMessage?: QuotedMessage;
}

export function createMessage(
    text: string,
    fileId: string | null,
    userName: string,
    quotedMessage?: QuotedMessage
): ChatMessage {
    return {
        userName,
        timestamp: Date.now(),
        text,
        quotedMessage,
        fileId,
    };
}