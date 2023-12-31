import { FC } from 'react'

import { SocialIcon, StyledButton } from './Button.styles'
import { Spinner } from '..'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  src?: string
  primary?: boolean
  secondary?: boolean
  danger?: boolean
  fullWidth?: boolean
  transparent?: boolean
}

const Button: FC<ButtonProps> = ({
  loading,
  disabled,
  src,
  primary,
  secondary,
  danger,
  fullWidth = true,
  transparent,
  children,
  ...props
}: ButtonProps) => <StyledButton
  className={
    [
      primary && 'primary',
      secondary && 'secondary',
      danger && 'danger',
      disabled && 'disabled',
      fullWidth && 'fullWidth',
      transparent && 'transparent',
    ].filter(Boolean).join(' ')
  }
  {...props}
>
  {loading && <Spinner />}
  {src && <SocialIcon src={src} />}
  {children}
</StyledButton>

export default Button
