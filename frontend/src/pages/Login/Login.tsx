import { useState } from 'react'

import { SocialLoginButton } from '/src/components'
import { env } from '/src/config'
import { supabase } from '/src/libs'

import { Error, FormWrapper, PageContainer, Title } from './Login.styles'

const Login = () => {
  const [loginError, setLoginError] = useState<string>()

  const handleSignInWithProvider = async (provider: 'google' | 'github') => {
    console.log({'test': env.FRONTEND_URL})
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: env.FRONTEND_URL
      }
    })
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
