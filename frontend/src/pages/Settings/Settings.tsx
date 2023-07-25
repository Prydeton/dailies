import { Button, Header } from '/src/components'
import { useAuth } from '/src/hooks'

import { Email, PageContainer, SettingsContainer, SignupDate } from './Settings.styles'

const Settings = () => {
  const { session, deleteUser } = useAuth()

  const handleDelete = async () => {
    if (confirm('Are you sure you would like to delete your account?')) {
      const res = await deleteUser()
      if (res?.error) console.warn(res.error)
    }
  }

  return (session && <>
    <Header />
    <PageContainer>
      <SettingsContainer>
        <Email>{session.user.email}</Email>
        <SignupDate>Signed up {new Date(session.user.created_at).toISOString().substring(0, 10)}</SignupDate>
        <Button fullWidth={false} danger onClick={handleDelete}>Delete account</Button>
      </SettingsContainer>
    </PageContainer>
  </>)
}

export default Settings
