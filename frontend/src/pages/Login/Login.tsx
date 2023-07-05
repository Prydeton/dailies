import { useState } from 'react'
import { Error, FormWrapper, PageContainer, Title } from './Login.styles'
import { SocialLoginButton } from '/src/components'
import { supabase } from '/src/lib'

const Login = () => {
  const [isGitHubLoading, setIsGitHubLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [loginError, setLoginError] = useState<string>()

  const handleSignInWithProvider = async (provider: 'google' | 'github') => {
    provider === 'google' ? setIsGoogleLoading(true) : setIsGitHubLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: 'http://localhost:5173'
      }
    })
    setLoginError(error?.message)
    setIsGoogleLoading(false)
    setIsGitHubLoading(false)
  }

  return (<PageContainer>
    <FormWrapper>
      <Title>Dailies</Title>
      <SocialLoginButton 
        text='Continue with Google' 
        src='/google-icon.png'
        onClick={() => handleSignInWithProvider('google')}
        disabled={isGoogleLoading || isGitHubLoading}
        loading={isGoogleLoading}
      />
      <SocialLoginButton 
        text='Continue with GitHub' 
        src='/github-icon.png'
        onClick={() => handleSignInWithProvider('github')}
        disabled={isGoogleLoading || isGitHubLoading}
        loading={isGitHubLoading}
      />
      {loginError && <Error>{loginError}</Error>}
    </FormWrapper>
  </PageContainer>)
}

export default Login
