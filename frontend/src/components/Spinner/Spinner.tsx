import { Center, Ring } from './Spinner.styles'

interface SpinnerProps {
  size?: string | number
  color?: string
  center?: boolean
}

const Spinner: React.FC<SpinnerProps> = ({
  size = '24px',
  center,
}) => {
  const style = {
    fontSize: size,
  } as React.CSSProperties

  if (center) return <Center><Ring style={style} /></Center>

  return <Ring style={style} />
}

export default Spinner
