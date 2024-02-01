import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Edit } from 'lucide-react'
import { Drawer } from 'vaul'

import { Button, CheckTaskList, EditTaskList } from '/src/components'
import { Task } from '/src/hooks/useCalendarQuery'
import handle from '/src/res/handle.svg'

import styles from './Day.module.css'

type DayProps = {
  closeFn: Dispatch<SetStateAction<undefined>>
  openedDate?: string
  tasks: Task[]
}

const Day = ({ openedDate, tasks, closeFn }: DayProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const canEdit = useMemo(() => openedDate === dayjs().format('YYYY-MM-DD'), [openedDate])

  return (
    <Drawer.Root open={!!openedDate} onClose={() => closeFn(undefined)}>
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} onClick={() => closeFn(undefined)}/>
        <Drawer.Content className={styles.contentWrapper}>
          <div className={styles.contentContainer}>
            <div className={styles.handleWrapper}><img className={styles.handle} src={handle} /></div>
            <div className={styles.header}>
              <h2>Tasks</h2>
              {(canEdit && !isEditing) && <Button transparent onClick={() => setIsEditing(true)} fullWidth={false}><Edit /></Button>}
            </div>
            {isEditing ?
              <EditTaskList tasks={tasks} openedDate={openedDate} setIsEditing={setIsEditing} /> :
              <CheckTaskList tasks={tasks} openedDate={openedDate} />
            }
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default Day
