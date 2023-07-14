import { useState } from 'react'

import { Button } from '/src/components'
import { useAuthStore } from '/src/hooks'

import { Error, FormWrapper, PageContainer, Title } from './Login.styles'

const Login = () => {
  const [loginError, setLoginError] = useState<string>()
  const { signInWithOAuth } = useAuthStore()

  const handleSignInWithProvider = async (provider: 'google' | 'github') => {
    const { error } = await signInWithOAuth(provider)
    setLoginError(error?.message)
  }

  return (<PageContainer>
    <FormWrapper>
      <Title>Dailies</Title>
      <Button
        src="/google-icon.png"
        onClick={() => handleSignInWithProvider('google')}
      >Continue with Google</Button>
      <Button
        src="/github-icon.png"
        onClick={() => handleSignInWithProvider('github')}
      >Continue with GitHub</Button>
      {loginError && <Error>{loginError}</Error>}
    </FormWrapper>
  </PageContainer>)
}

export default Login
