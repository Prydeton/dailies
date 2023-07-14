import { useState } from 'react'

import { SocialLoginButton } from '/src/components'
import { env } from '/src/config'
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
      <SocialLoginButton
        text="Continue with Google"
        src="/google-icon.png"
        onClick={() => handleSignInWithProvider('google')}
      />
      <SocialLoginButton
        text="Continue with GitHub"
        src="/github-icon.png"
        onClick={() => handleSignInWithProvider('github')}
      />
      {loginError && <Error>{loginError}</Error>}
    </FormWrapper>
  </PageContainer>)
}

export default Login
