import { Dispatch, FC, SetStateAction } from 'react'
import { createPortal } from 'react-dom'

import { CheckListItem } from '/src/components'
import { Task } from '/src/config/api'
import handle from '/src/res/handle.svg'

import { Cover, Handle, PageContainer, Wrapper } from './Day.styles'

type DayProps = {
  closeFn: Dispatch<SetStateAction<undefined>>
  openedDate?: string
  tasks?: Task[]
}

const Day: FC<DayProps> = ({ openedDate, tasks, closeFn }: DayProps) => {
  console.log(handle)
  return createPortal(
    <>
      <PageContainer className={openedDate ? 'open' : 'close'}>
        <Wrapper>
          <Handle onClick={() => closeFn(undefined)}><img src={handle} width={40} height={24}/></Handle>
          <h2>Tasks</h2>
          {tasks?.map(task => <CheckListItem key={task.id} task={task} />)}
        </Wrapper>
      </PageContainer>
      <Cover className={openedDate ? 'open' : 'close'} onClick={() => closeFn(undefined)}></Cover>
    </>,
    document.body)
}

export default Day
