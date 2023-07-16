import { FC } from 'react'
import { LogOut } from 'lucide-react'

import { useAuthStore } from '/src/hooks'

import { Container } from './Header.styles'
import { Button } from '..'

const Header: FC = () => {
  const { signOut } = useAuthStore()

  return (
    <Container>
      <h2>Dailies</h2>
      <Button style={{position: 'absolute', right: '0' }} transparent={true} onClick={() => signOut()} fullWidth={false}>
        <LogOut />
      </Button>
    </Container>
  )
}

export default Header
