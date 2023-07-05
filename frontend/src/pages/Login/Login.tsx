import { FormWrapper, PageContainer, Title } from './Login.styles'
import { SocialLoginButton } from '/src/components'

const Login = () => {
  return (<PageContainer>
    <FormWrapper>
      <Title>Dailies</Title>
      <SocialLoginButton 
        text='Continue with Google' 
        src='/google-icon.png'
        onClick={() => console.log("WOO GOOGLE")} 
      />
      <SocialLoginButton 
        text='Continue with GitHub' 
        src='/github-icon.png'
        onClick={() => console.log("WOO GITHUB")} 
      />
    </FormWrapper>
  </PageContainer>)
}

export default Login
