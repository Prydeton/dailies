import { Dispatch, FC, SetStateAction, useState } from 'react'
import { createPortal } from 'react-dom'

import { CheckListItem, EditTaskList } from '/src/components'
import { Task } from '/src/config/api'
import handle from '/src/res/handle.svg'

import { Cover, Handle, PageContainer, Wrapper } from './Day.styles'

type DayProps = {
  closeFn: Dispatch<SetStateAction<undefined>>
  openedDate?: string
  tasks: Task[]
}

const Day: FC<DayProps> = ({ openedDate, tasks, closeFn }: DayProps) => {
  const [isEditing, setIsEditing] = useState(false)

  return createPortal(
    <>
      <PageContainer className={openedDate ? 'open' : 'close'}>
        <Wrapper>
          <Handle onClick={() => {setIsEditing(false), closeFn(undefined)}}><img src={handle} width={40} height={24}/></Handle>
          <h2>Tasks</h2>
          {isEditing ? <EditTaskList tasks={tasks} openedDate={openedDate} setIsEditing={setIsEditing} /> :
            <div>
              {tasks?.map(task => <CheckListItem key={task.id} task={task} />)}
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
          }
        </Wrapper>
      </PageContainer>
      <Cover className={openedDate ? 'open' : 'close'} onClick={() => {setIsEditing(false), closeFn(undefined)}}></Cover>
    </>,
    document.body)
}

export default Day
