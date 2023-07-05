import { useEffect } from 'react'
import { useLocation } from 'wouter'

import { Header } from '/src/components'
import { useAuthStore } from '/src/hooks/useAuth'

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
    <button onClick={() => handleSignout()} />
  </>)
}

export default Main
