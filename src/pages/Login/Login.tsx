import logo from '../../assets/logo.svg'
import styles from './Login.module.css'


export default function Login() {
  return (
    <main className={styles.container}>
      <section className={styles.chatCard}>
        <header className={styles.header}>
          <img src={logo} alt="Chat Icon" className={styles.logo} />
          <h1 className={styles.title}>Добро пожаловать в чат!</h1>
        </header>

        <form>
          <p className={styles.description}>
            Введите ваше имя и название комнаты, чтобы начать общение
          </p>

          <label className={styles.inputGroup}>
            <span className={styles.inputLabel}>Имя пользователя</span>
            <input type="text" placeholder="Например: Александр" className={styles.input} />
          </label>

          <label className={styles.inputGroup}>
            <span className={styles.inputLabel}>Название комнаты</span>
            <input type="text" placeholder="Например: Общий чат" className={styles.input} />
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
