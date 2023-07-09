import { Dispatch, SetStateAction } from 'react'

import { Container } from './DayGlobe.styles'

interface DayGlobeProps {
  date: string
  setOpenedDate: Dispatch<SetStateAction<string>>
}

const DayGlobe: React.FC<DayGlobeProps> = ({ date, setOpenedDate }: DayGlobeProps) => {
  return (
    <Container onClick={() => setOpenedDate(date)}>
      {date}
    </Container>
  )
}

export default DayGlobe
