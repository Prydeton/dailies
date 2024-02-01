import styles from './Button.module.css'
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

const Button = ({
  loading,
  src,
  primary,
  secondary,
  danger,
  fullWidth = true,
  transparent,
  children,
  ...props
}: ButtonProps) => <button
  className={
    [
      styles.styledButton,
      primary && styles.primary,
      secondary && styles.secondary,
      danger && styles.danger,
      fullWidth && styles.fullWidth,
      transparent && styles.transparent,
    ].filter(Boolean).join(' ')
  }
  {...props}
>
  {loading && <Spinner />}
  {src && <img className={styles.socialIcon} src={src} />}
  {children}
</button>

export default Button
