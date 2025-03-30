import React, { useState, forwardRef } from 'react';
import { saveFile } from '@/db';
import icon from '@/shared/assets/img/icon.svg';
import styles from './FileInput.module.css';

interface FileInputProps {
    setFileId: (fileId: string | null) => void;
    setFileName: (fileName: string | null) => void;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
    ({ setFileId, setFileName }, ref) => {
        const [filePreview, setFilePreview] = useState<string | null>(null);

        const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = event.target.files?.[0] ?? null;
            if (selectedFile) {
                setFilePreview(URL.createObjectURL(selectedFile));
                setFileName(selectedFile.name);

                try {
                    const fileId = await saveFile(selectedFile);
                    setFileId(fileId);
                } catch (error) {
                    console.error('Error saving file:', error);
                }
            }
        };

        const renderPreview = () => {
            if (!filePreview) return null;

            if (filePreview.match(/\.(jpg|jpeg|png|gif)$/i)) {
                return <img src={filePreview} alt="Preview" className={styles.preview} />;
            }

            if (filePreview.match(/\.(mp4|webm)$/i)) {
                return (
                    <video controls className={styles.preview}>
                        <source src={filePreview} />
                        Ваш браузер не поддерживает видео.
                    </video>
                );
            }

            return null;
        };

        return (
            <div className={styles.fileInputContainer}>
                <label htmlFor="file-upload" className={styles.fileUploadIcon}>
                    <img src={icon} alt="Upload File" />
                </label>

                <input
                    id="file-upload"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    ref={ref}
                />

                {renderPreview()}
            </div>
        );
    }
);

export default FileInput;
