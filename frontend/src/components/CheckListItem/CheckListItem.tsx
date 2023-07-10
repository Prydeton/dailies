import { FC, useState } from 'react'
import { Check } from 'lucide-react'

import { Task } from '/src/config/api'
import { useCalendarStore } from '/src/hooks'

import { CheckButton, Container, Name } from './CheckListItem.styles'
import { Spinner } from '..'

type CheckListItemProps = {
  task: Task
}

const CheckListItem: FC<CheckListItemProps> = ({ task }: CheckListItemProps) => {
  const { updateTask } = useCalendarStore()
  const [isToggleIsCompleteLoading, setIsToggleIsCompleteLoading] = useState(false)

  const handleToggleIsComplete = (task: Task) => {
    const toggleIsComplete = async (task: Task) => {
      setIsToggleIsCompleteLoading(true)
      updateTask({ ...task, is_complete: !task.is_complete })
      setIsToggleIsCompleteLoading(false)
    }
    toggleIsComplete(task)
  }
  return (<Container>
    <Name>{task.name}</Name>
    <CheckButton
      className={isToggleIsCompleteLoading ? 'loading' : (task.is_complete ? 'complete' : '')}
      onClick={() => handleToggleIsComplete(task)}
      disabled={isToggleIsCompleteLoading}
    >
      {isToggleIsCompleteLoading ? <Spinner /> : (task.is_complete && <Check />)}
    </CheckButton>
  </Container>)
}

export default CheckListItem
