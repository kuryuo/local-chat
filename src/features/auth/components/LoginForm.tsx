import styles from './LoginForm.module.css';
import Button from '@/shared/ui/Button/Button';
import { useLoginForm } from '../hooks/useLoginForm';

export function LoginForm() {
    const {
        username,
        setUsername,
        chatname,
        setChatname,
        error,
        handleSubmit,
    } = useLoginForm();

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <p className={styles.description}>
                Введите ваше имя и название комнаты, чтобы начать общение
            </p>

            <label className={styles.inputGroup}>
                <span className={styles.inputLabel}>Имя пользователя</span>
                <input
                    type="text"
                    placeholder="Например: Александр"
                    className={styles.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>

            <label className={styles.inputGroup}>
                <span className={styles.inputLabel}>Название комнаты</span>
                <input
                    type="text"
                    placeholder="Например: Общий чат"
                    className={styles.input}
                    value={chatname}
                    onChange={(e) => setChatname(e.target.value)}
                />
            </label>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.buttonContainer}>
                <Button label="Войти в чат" />
            </div>
        </form>
    );
}
