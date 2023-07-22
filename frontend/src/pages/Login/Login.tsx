import { useState } from 'react'

import { Button } from '/src/components'
import { useAuth } from '/src/hooks'

import { Error, FormWrapper, PageContainer, PrivacyPolicy, Title } from './Login.styles'

const Login = () => {
  const [loginError, setLoginError] = useState<string>()
  const { signInWithOAuth } = useAuth()

  const handleSignInWithProvider = async (provider: 'google' | 'github') => {
    const res = await signInWithOAuth(provider)
    console.log({res})
    setLoginError('Temp')
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
    <PrivacyPolicy>View privacy policy <a href="/privacy">here</a></PrivacyPolicy>
  </PageContainer>)
}

export default Login
