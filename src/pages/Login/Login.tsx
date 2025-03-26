import logo from '../../assets/logo.svg';
import styles from './Login.module.css';
import {useState} from 'react';
import {useLocalStorage} from '../../hooks/useLocalStorage';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../../constans/const';

export default function Login() {
  const [username, setUsername] = useState('');
  const [chatname, setChatname] = useState('');
  const [, setStoredUsername] = useLocalStorage<string>('username', '');
  const [, setStoredChatname] = useLocalStorage<string>('chatname', '');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredUsername(username);
    setStoredChatname(chatname);
    navigate(ROUTES.CHAT);
  };

  return (
      <main className={styles.container}>
        <section className={styles.chatCard}>
          <header className={styles.header}>
            <img src={logo} alt="Chat Icon" className={styles.logo} />
            <h1 className={styles.title}>Добро пожаловать в чат!</h1>
          </header>

          <form onSubmit={handleSubmit}>
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

            <button type="submit" className={styles.submitButton}>
              Войти в чат
            </button>
          </form>

          <footer className={styles.footer}>
            <p className={styles.footerText}>
              Присоединяйтесь к существующей комнате или создайте новую
            </p>
          </footer>
        </section>
      </main>
  );
}
