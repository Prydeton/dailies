import { FC } from 'react'
import { Check } from 'lucide-react'

import { Task } from '/src/config/api'

import { CheckButton, Container, Name } from './CheckListItem.styles'

type CheckListItemProps = {
  task: Task
}

const CheckListItem: FC<CheckListItemProps> = ({ task }: CheckListItemProps) => {
  return (<Container>
    <Name>{task.name}</Name>
    <CheckButton
      className={!task.is_complete ? 'complete' : ''}
    >
      {!task.is_complete && <Check />}
    </CheckButton>
  </Container>)
}

export default CheckListItem
