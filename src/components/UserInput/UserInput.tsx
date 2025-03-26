import React from "react";
import styles from "./UserInput.module.css";

const UserInput: React.FC = () => {
  return (
    <div className={styles.userInput}>
      <input
        type="text"
        className={styles.input}
        placeholder="Type a message..."
      />
      <button className={styles.sendButton}>Send</button>
    </div>
  );
};

export default UserInput;
