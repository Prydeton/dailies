import { FC } from 'react'
import { Check,  } from 'lucide-react'

import { Task } from '/src/config/api'
import { useCalendarStore } from '/src/hooks'

import { CheckButton, CheckItemContainer, Name } from './CheckTaskList.styles'

interface CheckTaskListProps {
  tasks: Task[],
  openedDate?: string,
}

const CheckTaskList: FC<CheckTaskListProps> = ({ tasks, openedDate }: CheckTaskListProps) => {
  const { updateDay } = useCalendarStore()

  return (
    <>
      {tasks.map((task => <CheckItemContainer key={task.id}>
        <Name>{task.name}</Name>
        <CheckButton
          className={(task.is_complete ? 'complete' : '')}
          onClick={() => {
            if (!openedDate) return
            console.log({task})
            updateDay(openedDate, tasks.map(t => task.id === t.id ? { ...task, is_complete: !task.is_complete } : t))}
          }>
          {task.is_complete && <Check />}
        </CheckButton>
      </CheckItemContainer>))}
    </>
  )
}

export default CheckTaskList
