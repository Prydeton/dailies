import { Calendar, LogIn, LogOut, Settings } from 'lucide-react'
import { useLocation } from 'wouter'

import { useAuth } from '/src/hooks'

import { Button } from '..'
import styles from './Header.module.css'

const Header = () => {
  const { signOut, session } = useAuth()
  const [location, setLocation] = useLocation()

  return (
    <div className={styles.container}>
      {session && location === '/' && (
        <Button
          style={{ position: 'absolute', left: '0' }}
          transparent={true}
          onClick={() => setLocation('/settings')}
          fullWidth={false}
        >
          <Settings />
        </Button>
      )}
      {session && location === '/settings' && (
        <Button
          style={{ position: 'absolute', left: '0' }}
          transparent={true}
          onClick={() => setLocation('/')}
          fullWidth={false}
        >
          <Calendar />
        </Button>
      )}
      {!session && location === '/privacy' && (
        <Button
          style={{ position: 'absolute', left: '0' }}
          transparent={true}
          onClick={() => setLocation('/settings')}
          fullWidth={false}
        >
          <LogIn />
        </Button>
      )}
      <h1>Dailies</h1>
      {session && (
        <Button
          style={{ position: 'absolute', right: '0' }}
          transparent={true}
          onClick={() => signOut()}
          fullWidth={false}
        >
          <LogOut />
        </Button>
      )}
    </div>
  )
}

export default Header
