import { Spinner } from '..'
import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  src?: string
  primary?: boolean
  secondary?: boolean
  danger?: boolean
  fullWidth?: boolean
  transparent?: boolean
  alt?: string
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
  alt,
  ...props
}: ButtonProps) => (
  <button
    className={[
      styles.styledButton,
      primary && styles.primary,
      secondary && styles.secondary,
      danger && styles.danger,
      fullWidth && styles.fullWidth,
      transparent && styles.transparent,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {loading && <Spinner />}
    {src && <img className={styles.socialIcon} src={src} alt={alt} />}
    {children}
  </button>
)

export default Button
