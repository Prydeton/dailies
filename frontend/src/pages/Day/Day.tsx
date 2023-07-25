import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import dayjs from 'dayjs'
import { Edit } from 'lucide-react'

import { Button, CheckTaskList, EditTaskList } from '/src/components'
import { Task } from '/src/hooks/useCalendarQuery'
import handle from '/src/res/handle.svg'

import { Cover, Handle, HeaderContainer, PageContainer, Wrapper } from './Day.styles'

type DayProps = {
  closeFn: Dispatch<SetStateAction<undefined>>
  openedDate?: string
  tasks: Task[]
}

const Day: FC<DayProps> = ({ openedDate, tasks, closeFn }: DayProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const canEdit = useMemo(() => openedDate === dayjs().format('YYYY-MM-DD'), [openedDate])

  return createPortal(
    <>
      <PageContainer className={openedDate ? 'open' : 'close'}>
        <Wrapper>
          <Handle onClick={() => {setIsEditing(false), closeFn(undefined)}}><img src={handle} width={40} height={24}/></Handle>
          <HeaderContainer>
            <h2>Tasks</h2>
            {(canEdit && !isEditing) && <Button transparent onClick={() => setIsEditing(true)} fullWidth={false}><Edit /></Button>}
          </HeaderContainer>
          {isEditing
            ? <EditTaskList tasks={tasks} openedDate={openedDate} setIsEditing={setIsEditing} />
            : <CheckTaskList tasks={tasks} openedDate={openedDate} />
          }
        </Wrapper>
      </PageContainer>
      <Cover className={openedDate ? 'open' : 'close'} onClick={() => {setIsEditing(false), closeFn(undefined)}}></Cover>
    </>,
    document.body)
}

export default Day
