import React from 'react';
import styles from './FileInput.module.css';
import clipIcon from '../../assets/img/icon.svg';

const FileInput: React.FC = () => {
    return (
        <div className={styles.fileInput}>
            <input
                type="file"
                id="file-upload"
                accept="image/*, video/*"
                className={styles.hiddenInput}
            />
            <label htmlFor="file-upload" className={styles.iconButton}>
                <img src={clipIcon} alt="Attach file" className={styles.icon} />
            </label>
        </div>
    );
};

export default FileInput;
