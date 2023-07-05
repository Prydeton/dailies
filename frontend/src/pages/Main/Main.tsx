import { useEffect } from "react"
import { useAuthStore } from "/src/hooks/useAuth"
import { useLocation } from "wouter";

const Main = () => {
  const { isAuthLoading, session, signOut } = useAuthStore()
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthLoading && !session) {
      setLocation('/login')
    } 
  }, [isAuthLoading, session])

  const handleSignout = () => {
    signOut()
  }

  return (<>
    Logged in
    <button onClick={() => handleSignout()} />
  </>)
}

export default Main
