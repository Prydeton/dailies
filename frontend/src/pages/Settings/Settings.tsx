import { Button, Header } from '/src/components'
import { useAuth } from '/src/hooks'
import styles from './Settings.module.css'

const Settings = () => {
  const { session, deleteUser } = useAuth()

  const handleDelete = async () => {
    if (confirm('Are you sure you would like to delete your account?')) {
      const res = await deleteUser()
      if (res?.error) console.warn(res.error)
    }
  }

  return (
    session && (
      <>
        <Header />
        <main className={styles.pageContainer}>
          <div className={styles.settingsContainer}>
            <span className={styles.email}>{session.user.email}</span>
            <span className={styles.signupDate}>
              Signed up {new Date(session.user.created_at).toISOString().substring(0, 10)}
            </span>
            <Button fullWidth={false} danger onClick={handleDelete}>
              Delete account
            </Button>
          </div>
        </main>
      </>
    )
  )
}

export default Settings
