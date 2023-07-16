import { useEffect } from 'react'
import { useLocation } from 'wouter'

import { Button, Spinner } from '/src/components'
import { useAuthStore } from '/src/hooks'

import { Email, PageContainer, SettingsContainer, SignupDate } from './Settings.styles'

const Settings = () => {
  const { session, isAuthLoading } = useAuthStore()
  const [, setLocation] = useLocation()

  useEffect(() => {
    if (!isAuthLoading && !session) setLocation('/login')
  }, [isAuthLoading, session])

  const handleDelete = () => {
    if (confirm('Are you sure you would like to delete your account?')) {
      return
    } else {
      return
    }
  }

  return (
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
  )
}

export default Settings
