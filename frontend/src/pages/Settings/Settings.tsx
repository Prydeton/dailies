import { useEffect } from 'react'
import { useLocation } from 'wouter'

import { Button, Header, Spinner } from '/src/components'
import { useAuthStore } from '/src/hooks'

import { Email, PageContainer, SettingsContainer, SignupDate } from './Settings.styles'

const Settings = () => {
  const { session, isAuthLoading, deleteUser, signOut } = useAuthStore()
  const [, setLocation] = useLocation()

  useEffect(() => {
    if (!isAuthLoading && !session) setLocation('/login')
  }, [isAuthLoading, session])

  const handleDelete = async () => {
    if (!session?.user.id) return
    if (confirm('Are you sure you would like to delete your account?')) {
      const res = await deleteUser()
      if (!res?.error) return signOut()
      console.warn(res.error)
    }
  }

  return (<>
    <Header />
    <PageContainer>
      {
        (isAuthLoading || !session) ?
          <Spinner /> :
          <SettingsContainer>
            <Email>{session?.user.email}</Email>
            <SignupDate>Signed up {new Date(session?.user?.created_at).toISOString().substring(0, 10)}</SignupDate>
            <Button fullWidth={false} danger onClick={handleDelete}>Delete Acount</Button>
          </SettingsContainer>
      }
    </PageContainer>
  </>)
}

export default Settings
