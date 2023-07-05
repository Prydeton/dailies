import { CSSProperties, FC } from 'react'
import { Center, Ring } from './Spinner.styles'

interface SpinnerProps {
  size?: string | number
  color?: string
  center?: boolean
}

const Spinner: FC<SpinnerProps> = ({
  size = '24px',
  center,
}) => {
  const style = {
    fontSize: size,
  } as CSSProperties

  if (center) return <Center><Ring style={style} /></Center>

  return <Ring style={style} />
}

export default Spinner
