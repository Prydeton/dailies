import { FC } from 'react'
import { LogOut } from 'lucide-react'

import { useAuthStore } from '/src/hooks'

import { Container, Spacer, Title, TitleWrapper } from './Header.styles'
import { Button } from '..'

const Header: FC = () => {
  const { signOut } = useAuthStore()

  return (
    <Container>
      <Button transparent={true} onClick={() => signOut()} fullWidth={false}>
        <LogOut />
      </Button>
      <TitleWrapper>
        <Title>Dailies</Title>
      </TitleWrapper>
      <Spacer />
    </Container>
  )
}

export default Header
