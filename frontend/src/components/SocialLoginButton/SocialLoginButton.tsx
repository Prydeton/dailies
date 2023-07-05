import { FC } from "react";
import { SocialIcon, StyledLoginButton } from "./SocialLoginButton.styles";

interface SocialLoginButtonProps {
  text: string
  src: string
  onClick: React.MouseEventHandler<HTMLButtonElement>;
} 
const SocialLoginButton: FC<SocialLoginButtonProps> = ({text, src, onClick}: SocialLoginButtonProps) => (
  <StyledLoginButton type='submit' onClick={onClick}>
    <SocialIcon src={src}></SocialIcon>
    {text}
  </StyledLoginButton>
)

export default SocialLoginButton


