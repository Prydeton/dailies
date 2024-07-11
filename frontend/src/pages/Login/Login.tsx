import { useState } from 'react'

import { Button } from '/src/components'
import { useAuth } from '/src/hooks'

import { ErrorText, FormWrapper, PageContainer, PrivacyPolicy, Title } from './Login.styles'

const Login = () => {
  const [loginError, setLoginError] = useState<string>()
  const { signInWithOAuth, session } = useAuth()
  console.log('here')
  console.log(session)
  const handleSignInWithProvider = async (provider: 'google' | 'github') => {
    const { error } = await signInWithOAuth(provider)
    if (error) setLoginError(error.message)
  }

  return (
    <PageContainer>
      <FormWrapper>
        <Title>Dailies</Title>
        <Button src="/google-icon.png" onClick={() => handleSignInWithProvider('google')}>
          Continue with Google
        </Button>
        <Button src="/github-icon.png" onClick={() => handleSignInWithProvider('github')}>
          Continue with GitHub
        </Button>
        {loginError && <ErrorText>{loginError}</ErrorText>}
      </FormWrapper>
      <PrivacyPolicy>
        View privacy policy <a href="/privacy">here</a>
      </PrivacyPolicy>
    </PageContainer>
  )
}

export default Login
