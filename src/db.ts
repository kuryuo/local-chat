const openDB = async () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open('chatDB', 1);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains('media')) {
                db.createObjectStore('media', { keyPath: 'id' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = (error) => reject(error);
    });
};

const saveFile = async (file: File) => {
    if (!(file instanceof File)) {
        throw new Error("Expected a valid File object.");
    }

    const db = await openDB();
    const transaction = db.transaction('media', 'readwrite');
    const store = transaction.objectStore('media');

    const fileId = crypto.randomUUID();
    const fileData = { id: fileId, file };

    store.put(fileData);

    return fileId;
};

const getFile = async (fileId: string) => {
    const db = await openDB();
    const transaction = db.transaction('media', 'readonly');
    const store = transaction.objectStore('media');

    return new Promise<File | null>((resolve, reject) => {
        const request = store.get(fileId);
        request.onsuccess = () => resolve(request.result ? request.result.file : null);
        request.onerror = (error) => reject(error);
    });
};

const clearDatabase = async () => {
    const db = await openDB();
    const transaction = db.transaction('media', 'readwrite');
    const store = transaction.objectStore('media');
    store.clear();
};

export { saveFile, getFile, clearDatabase };
