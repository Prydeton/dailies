import { Dispatch, SetStateAction, useMemo } from 'react'

import { Task } from '/src/config/api'

import { Container, GlobeWrapper, Month } from './DayGlobe.styles'

interface DayGlobeProps {
  date: string
  setOpenedDate: Dispatch<SetStateAction<string>>
  tasks: Task[]
}

const DayGlobe: React.FC<DayGlobeProps> = ({ tasks, date, setOpenedDate }: DayGlobeProps) => {
  const fillPercentage = useMemo(() => {
    if (tasks.length === 0) return 0
    const completedTasks = tasks.filter(task => task.is_complete)
    return (completedTasks.length / tasks.length) * 100
  }, [tasks])

  return (
    <Container>
      <GlobeWrapper onClick={() => setOpenedDate(date)} disabled={tasks.length === 0}>
        <Wave fillPercentage={fillPercentage}/>
      </GlobeWrapper>
      <Month disabled={tasks.length === 0}>{new Date(date).getDate()}</Month>
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
      viewBox={`0 ${-950 + (fillPercentage / 100) * (150 - -950)} 1000 1000`}
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
