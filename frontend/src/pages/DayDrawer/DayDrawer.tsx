import dayjs from 'dayjs'
import { Edit } from 'lucide-react'
import { type Dispatch, type SetStateAction, useMemo, useState } from 'react'
import { Drawer } from 'vaul'

import { Button, CheckTaskList, EditTaskList } from '/src/components'
import handle from '/src/res/handle.svg'
import type { Day } from '../../types'

import styles from './DayDrawer.module.css'

type DayDrawerProps = {
  closeFn: Dispatch<SetStateAction<undefined>>
  day?: Day
}

const DayDrawer = ({ day, closeFn }: DayDrawerProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const canEdit = useMemo(() => day?.date === dayjs().format('YYYY-MM-DD'), [day])

  return day ? (
    <Drawer.Root open={!!day} onClose={() => closeFn(undefined)}>
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} onClick={() => closeFn(undefined)} />
        <Drawer.Content className={styles.contentWrapper}>
          <div className={styles.contentContainer}>
            <div className={styles.handleWrapper}>
              <img className={styles.handle} src={handle} alt="Drawer handle" />
            </div>
            <div className={styles.header}>
              <h2>Tasks</h2>
              {canEdit && !isEditing && (
                <Button transparent onClick={() => setIsEditing(true)} fullWidth={false}>
                  <Edit />
                </Button>
              )}
            </div>
            {isEditing ? <EditTaskList day={day} setIsEditing={setIsEditing} /> : <CheckTaskList day={day} />}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  ) : (
    <></>
  )
}

export default DayDrawer
