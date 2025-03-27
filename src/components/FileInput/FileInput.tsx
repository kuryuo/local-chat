import React, { useState } from 'react';
import styles from './FileInput.module.css';
import {FileInputProps} from "../../types/types.ts";

const FileInput: React.FC<FileInputProps> = ({ onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setSelectedFile(file);
            onFileSelect(file);
        }
    };

    return (
        <div className={styles.fileInput}>
            <input
                type="file"
                accept="image/*, video/*"
                onChange={handleFileChange}
            />
            {selectedFile && (
                <div className={styles.selectedFile}>
                    <p>{selectedFile.name}</p>
                </div>
            )}
        </div>
    );
};

export default FileInput;
