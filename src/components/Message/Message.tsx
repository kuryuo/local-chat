import React from 'react';
import styles from './Message.module.css';


const Message: React.FC = () => {
  return (
    <div className={styles.message}>
      <div className={styles.header}>
        <span className={styles.userName}>User Name</span>
        <span className={styles.timestamp}>12:34 PM</span>
      </div>
      <div className={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod libero nec purus vulputate.
      </div>
      <div className={styles.media}>
      <img src="https://placehold.co/600x400" alt="placeholder" />
      </div>
    </div>
  );
};

export default Message;
