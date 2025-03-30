import styles from './LoginPage.module.css';
import logo from '@/shared/assets/img/logo.svg';
import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  return (
      <main className={styles.container}>
        <section className={styles.chatCard}>
          <header className={styles.header}>
            <img src={logo} alt="Chat Icon" className={styles.logo} />
            <h1 className={styles.title}>Добро пожаловать в чат!</h1>
          </header>

          <LoginForm />

          <footer className={styles.footer}>
            <p className={styles.footerText}>
              Присоединяйтесь к существующей комнате или создайте новую
            </p>
          </footer>
        </section>
      </main>
  );
}
