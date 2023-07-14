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
      <GlobeWrapper fillPercentage={fillPercentage} onClick={() => setOpenedDate(date)} disabled={tasks.length === 0}>

      </GlobeWrapper>
      <Month>{new Date(date).getDate()}</Month>
    </Container>
  )
}

export default DayGlobe
