import { Check,  } from 'lucide-react'

import { useCalendarQuery } from '/src/hooks'
import { Task } from '/src/hooks/useCalendarQuery'

import styles from './CheckTaskList.module.css'

interface CheckTaskListProps {
  tasks: Task[],
  openedDate?: string,
}

const CheckTaskList = ({ tasks, openedDate }: CheckTaskListProps) => {
  const { updateDay } = useCalendarQuery()

  return (
    <div className={styles.wrapper}>
      {tasks.map((task => <div className={styles.checkItemContainer} key={task.id}>
        <span className={styles.name}>{task.name}</span>
        <button className={[styles.checkButton, task.is_complete ? styles.complete : null].filter(Boolean).join(' ')}
          onClick={() => {
            if (!openedDate) return

            updateDay(openedDate, tasks.map(t => task.id === t.id ? { ...task, is_complete: !task.is_complete } : t))}
          }>
          {task.is_complete && <Check />}
        </button>
      </div>))}
    </div>
  )
}

export default CheckTaskList
