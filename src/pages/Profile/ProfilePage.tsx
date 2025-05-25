import styles from './ProfilePage.module.scss'

export const ProfilePage = () => {
  return (
    <div className="container">
      <h2 className={styles.title}>Profile page</h2>
      <p className={styles.text}>Welcome to profile page!</p>
      <div className={styles.row}>
        <span className={styles.fieldName}>First name: </span>
        {'Igor'}
      </div>
      <div className={styles.row}>
        <span className={styles.fieldName}>Last name: </span>
        {'Catamaranov'}
      </div>
    </div>
  )
}
