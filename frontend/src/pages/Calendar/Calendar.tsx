import { useEffect } from 'react'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLocation } from 'wouter'

import { Header } from '/src/components'
import { useAuthStore } from '/src/hooks/useAuth'

import { ControlButton, ControlMonth, ControlsContainer } from './Calendar.styles'

const Main = () => {
  const { isAuthLoading, session, signOut } = useAuthStore()
  const [location, setLocation] = useLocation()

  useEffect(() => {
    if (!isAuthLoading && !session) {
      setLocation('/login')
    }
  }, [isAuthLoading, session])

  const handleSignout = () => {
    signOut()
  }

  return (<>
    <Header />
    <ControlsContainer>
      <ControlButton
        disabled={false}
        onClick={(() => console.log('End left'))}>
        <ChevronFirst />
      </ControlButton>

      <ControlButton
        disabled={false}
        onClick={() => console.log('Left')}>
        <ChevronLeft />
      </ControlButton>

      <ControlMonth>DECEMBER</ControlMonth>

      <ControlButton
        disabled={false}
        onClick={() => console.log('Right')}>
        <ChevronRight />
      </ControlButton>

      <ControlButton
        disabled={true}
        onClick={(() => console.log('End Right'))}>
        <ChevronLast />
      </ControlButton>

    </ControlsContainer>
    <button onClick={() => handleSignout()} />
  </>)
}

export default Main
