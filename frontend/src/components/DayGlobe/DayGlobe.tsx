import { Container } from './DayGlobe.styles'

interface DayGlobeProps {
  date?: string
}

const DayGlobe: React.FC<DayGlobeProps> = ({ date }: DayGlobeProps) => {
  return (
    <Container>
      {date}
    </Container>
  )
}

export default DayGlobe
