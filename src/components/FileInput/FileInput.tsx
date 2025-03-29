import React, { useState } from 'react';
import { saveFile } from '../../db';
import icon from '../../assets/img/icon.svg';
import styles from './FileInput.module.css';

interface FileInputProps {
    setFileId: (fileId: string | null) => void;
    setFileName: (fileName: string | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ setFileId, setFileName }) => {
    const [filePreview, setFilePreview] = useState<string | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        if (selectedFile) {
            setFilePreview(URL.createObjectURL(selectedFile));
            setFileName(selectedFile.name);

            try {
                const fileId = await saveFile(selectedFile);
                console.log('Generated fileId:', fileId);
                setFileId(fileId);
            } catch (error) {
                console.error('Error saving file:', error);
            }
        }
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
            />

            {filePreview && (
                <div>
                    {filePreview.endsWith('.jpg') || filePreview.endsWith('.jpeg') || filePreview.endsWith('.png') ? (
                        <img src={filePreview} alt="Preview" style={{ width: '100px', height: '100px' }} />
                    ) : filePreview.endsWith('.mp4') || filePreview.endsWith('.webm') ? (
                        <video controls width="100">
                            <source src={filePreview} />
                            Ваш браузер не поддерживает видео.
                        </video>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default FileInput;
