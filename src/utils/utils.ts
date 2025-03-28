export const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
};

export const autoResizeTextarea = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
};