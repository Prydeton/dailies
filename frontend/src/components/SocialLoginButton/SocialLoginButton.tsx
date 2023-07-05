import { FC } from "react";
import { SocialIcon, StyledLoginButton } from "./SocialLoginButton.styles";
import { Spinner } from "..";

interface SocialLoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  text: string
  src: string
} 

const SocialLoginButton: FC<SocialLoginButtonProps> = ({loading, text, src, ...rest}: SocialLoginButtonProps) => (
  <StyledLoginButton {...rest}>
    {loading ? <Spinner /> : <><SocialIcon src={src} /> {text}</>}
  </StyledLoginButton>
)

export default SocialLoginButton


