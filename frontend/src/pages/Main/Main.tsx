import { useEffect } from "react"
import { useAuthStore } from "/src/hooks/useAuth"
import { useLocation } from "wouter";

const Main = () => {
  const { isAuthLoading, session, signOut } = useAuthStore()
  const [location, setLocation] = useLocation();
  console.log(isAuthLoading)
  useEffect(() => {
    if (!isAuthLoading && !session) {
      setLocation('/login')
    } 
  }, [isAuthLoading, session])

  const handleSignout = () => {
    console.log("test")
    signOut()
  }

  return (<>
    Logged in
    <button onClick={() => handleSignout()} />
  </>)
}

export default Main
