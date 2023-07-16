import { FC } from 'react'
import { Calendar, LogOut, Settings } from 'lucide-react'
import { useLocation } from 'wouter'

import { useAuthStore } from '/src/hooks'

import { Container } from './Header.styles'
import { Button } from '..'

const Header: FC = () => {
  const { signOut } = useAuthStore()
  const [location, setLocation] = useLocation()

  return (
    <Container>
      {location === '/' ?
        <Button style={{position: 'absolute', left: '0' }} transparent={true} onClick={() => setLocation('/settings')} fullWidth={false}>
          <Settings />
        </Button>
        :
        <Button style={{position: 'absolute', left: '0' }} transparent={true} onClick={() => setLocation('/')} fullWidth={false}>
          <Calendar />
        </Button>
      }
      <h2>Dailies</h2>
      <Button style={{position: 'absolute', right: '0' }} transparent={true} onClick={() => signOut()} fullWidth={false}>
        <LogOut />
      </Button>
    </Container>
  )
}

export default Header
