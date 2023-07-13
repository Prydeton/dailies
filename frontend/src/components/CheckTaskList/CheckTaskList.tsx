import { FC } from 'react'
import { Check,  } from 'lucide-react'

import { Task } from '/src/config/api'
import { useCalendarStore } from '/src/hooks'

import { CheckButton, CheckItemContainer, Name } from './CheckTaskList.styles'

interface CheckTaskListProps {
  tasks: Task[],

}

const CheckTaskList: FC<CheckTaskListProps> = ({ tasks }: CheckTaskListProps) => <>
  {tasks.map((task => <CheckListItem key={task.id} task={task} />))}
</>

export default CheckTaskList

type CheckListItemProps = {
  task: Task
}

const CheckListItem: FC<CheckListItemProps> = ({ task }: CheckListItemProps) => {
  const { updateTask } = useCalendarStore()

  return (<CheckItemContainer>
    <Name>{task.name}</Name>
    <CheckButton
      className={(task.is_complete ? 'complete' : '')}
      onClick={() => updateTask({ ...task, is_complete: !task.is_complete })}
    >
      {task.is_complete && <Check />}
    </CheckButton>
  </CheckItemContainer>)
}
