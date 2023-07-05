import { FC } from 'react'

import { SocialIcon, StyledLoginButton } from './SocialLoginButton.styles'

interface SocialLoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  src: string
}

const SocialLoginButton: FC<SocialLoginButtonProps> = ({ text, src, ...rest }: SocialLoginButtonProps) => (
  <StyledLoginButton {...rest}>
    <SocialIcon src={src} />{text}
  </StyledLoginButton>
)

export default SocialLoginButton


