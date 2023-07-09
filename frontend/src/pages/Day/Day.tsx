import { Dispatch, FC, SetStateAction } from 'react'
import { createPortal } from 'react-dom'

import { Task } from '/src/config/api'

import { Cover, PageContainer } from './Day.styles'

type DayProps = {
  closeFn: Dispatch<SetStateAction<undefined>>
  openedDate?: string
  tasks?: Task[]
}

const Day: FC<DayProps> = ({ openedDate, tasks, closeFn }: DayProps) => {

  return createPortal(
    <Cover className={openedDate ? 'open' : 'close'} onClick={() => closeFn(undefined)}>
      <PageContainer className={openedDate ? 'open' : 'close'}>

      </PageContainer>
    </Cover>,
    document.body)
}

export default Day
