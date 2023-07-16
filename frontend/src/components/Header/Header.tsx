import { FC } from 'react'
import { LogOut, Settings } from 'lucide-react'
import { useLocation } from 'wouter'

import { useAuthStore } from '/src/hooks'

import { Container } from './Header.styles'
import { Button } from '..'

const Header: FC = () => {
  const { signOut } = useAuthStore()
  const [, setLocation] = useLocation()

  return (
    <Container>
      <Button style={{position: 'absolute', left: '0' }} transparent={true} onClick={() => setLocation('/settings')} fullWidth={false}>
        <Settings />
      </Button>
      <h2>Dailies</h2>
      <Button style={{position: 'absolute', right: '0' }} transparent={true} onClick={() => signOut()} fullWidth={false}>
        <LogOut />
      </Button>
    </Container>
  )
}

export default Header
