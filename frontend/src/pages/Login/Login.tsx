import { useState } from 'react'
import { Button } from '/src/components'
import { useAuth } from '/src/hooks'
import styles from './Login.module.css'

const Login = () => {
  const [loginError, setLoginError] = useState<string>()
  const { signInWithOAuth } = useAuth()

  const handleSignInWithProvider = async (provider: 'google' | 'github') => {
    const { error } = await signInWithOAuth(provider)
    if (error) setLoginError(error.message)
  }

  return (
    <main className={styles.pageContainer}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Dailies</h1>
        <Button src="/google-icon.png" onClick={() => handleSignInWithProvider('google')}>
          Continue with Google
        </Button>
        <Button src="/github-icon.png" onClick={() => handleSignInWithProvider('github')}>
          Continue with GitHub
        </Button>
        {loginError && <span className={styles.errorText}>{loginError}</span>}
      </div>
      <span className={styles.privacyPolicy}>
        View privacy policy <a href="/privacy">here</a>
      </span>
    </main>
  )
}

export default Login
