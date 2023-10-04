import { Dispatch, SetStateAction, useMemo } from 'react'

import { Task } from '/src/hooks/useCalendarQuery'
import { calculateFillPercentage, lerp } from '/src/utils'

import { Container, GlobeWrapper, Month } from './DayGlobe.styles'

interface DayGlobeProps {
  date?: string
  setOpenedDate: Dispatch<SetStateAction<string>>
  tasks: Task[]
}

const DayGlobe: React.FC<DayGlobeProps> = ({ tasks, date, setOpenedDate }: DayGlobeProps) => {
  const fillPercentage = useMemo(() => calculateFillPercentage(tasks), [tasks])

  return (
    <Container>
      <GlobeWrapper onClick={() => date && setOpenedDate(date)} disabled={tasks.length === 0}>
        <Wave fillPercentage={fillPercentage}/>
        {date && <Month style={{color: fillPercentage <= .2 ? 'var(--white)' : 'var(--background-dark)'}}>{new Date(date).getDate()}</Month>}
      </GlobeWrapper>
    </Container>
  )
}

interface WaveProps {
  fillPercentage: number
}

const Wave: React.FC<WaveProps> = ({ fillPercentage }: WaveProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 ${lerp(-950, 150, fillPercentage)} 1000 1000`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      overflow="auto"
      shapeRendering="auto"
      fill="transparent"
    >
      <defs>
        <path
          id="wavepath"
          d="M 0 2000 0 500 Q 150 450 300 500 t 300 0 300 0 300 0 300 0 300 0  v1000 z"
        />
        <path id="motionpath" d="M -600 0 0 0" />
      </defs>
      <g>
        <use xlinkHref="#wavepath" y="-398" fill="var(--neon-green)" stroke="var(--white)" strokeWidth="30">
          <animateMotion dur="5s" repeatCount="indefinite">
            <mpath xlinkHref="#motionpath" />
          </animateMotion>
        </use>
      </g>
    </svg>

  )
}

export default DayGlobe
