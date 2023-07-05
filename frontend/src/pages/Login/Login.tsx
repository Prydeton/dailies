import { useState } from 'react'
import { Error, FormWrapper, PageContainer, Title } from './Login.styles'
import { SocialLoginButton } from '/src/components'
import { supabase } from '/src/libs'

const Login = () => {
  const [loginError, setLoginError] = useState<string>()

  const handleSignInWithProvider = async (provider: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: 'http://localhost:5173'
      }
    })
    setLoginError(error?.message)
  }

  return (<PageContainer>
    <FormWrapper>
      <Title>Dailies</Title>
      <SocialLoginButton 
        text='Continue with Google' 
        src='/google-icon.png'
        onClick={() => handleSignInWithProvider('google')}
      />
      <SocialLoginButton 
        text='Continue with GitHub' 
        src='/github-icon.png'
        onClick={() => handleSignInWithProvider('github')}
      />
      {loginError && <Error>{loginError}</Error>}
    </FormWrapper>
  </PageContainer>)
}

export default Login
