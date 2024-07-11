import styles from './Spinner.module.css'

interface SpinnerProps {
  center?: boolean
}

const Spinner = ({ center }: SpinnerProps) => {
  if (center)
    return (
      <div className={styles.center}>
        <span className={styles.ring} />
      </div>
    )

  return <span className={styles.ring} />
}

export default Spinner
