import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={`container ${styles.footer}`}>
      <p className={styles.footerText}>
        © 2025 GreenShop. By RS-school students.
      </p>
    </footer>
  )
}

export default Footer
