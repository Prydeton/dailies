import { FC } from 'react'

import { SocialIcon, StyledButton } from './Button.styles'
import { Spinner } from '..'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  src?: string
  primary?: boolean
  secondary?: boolean
  text?: string
  center?: boolean
}

const Button: FC<ButtonProps> = ({
  loading,
  disabled,
  src,
  primary,
  secondary,
  children,
  ...props
}: ButtonProps) => <StyledButton
  className={
    [
      primary && 'primary',
      secondary && 'secondary',
      disabled && 'disabled'
    ].filter(Boolean).join(' ')
  }
  {...props}
>
  {loading && <Spinner />}
  {src && <SocialIcon src={src} />}
  {children}
</StyledButton>

export default Button
