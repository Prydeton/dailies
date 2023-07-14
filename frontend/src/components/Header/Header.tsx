import { FC } from 'react'
import { LogOut } from 'lucide-react'

import { useAuthStore } from '/src/hooks'

import { Container } from './Header.styles'
import { Button } from '..'

const Header: FC = () => {
  const { signOut } = useAuthStore()

  return (
    <Container>
      <Button style={{position: 'absolute', left: '20px' }} transparent={true} onClick={() => signOut()} fullWidth={false}>
        <LogOut />
      </Button>
      <h2>Dailies</h2>
    </Container>
  )
}

export default Header
