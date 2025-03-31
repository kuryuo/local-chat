export const ROUTES = {
    LOGIN: "/",
  };

export const STORAGE_KEYS = {
    USERNAME: 'username',
    CHATNAME: 'chatname',
    MESSAGES: (chatname: string) => `messages_${chatname}`,
};
  