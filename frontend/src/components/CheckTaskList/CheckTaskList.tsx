import { Check } from 'lucide-react'
import { useUpdateDay } from '/src/hooks'
import type { Day } from '../../types'
import styles from './CheckTaskList.module.css'

interface CheckTaskListProps {
  day: Day
}

const CheckTaskList = ({ day }: CheckTaskListProps) => {
  const { mutate: updateDay } = useUpdateDay()

  return (
    <div className={styles.wrapper}>
      {day.tasks.map((task) => (
        <div className={styles.checkItemContainer} key={task.id}>
          <span className={styles.name}>{task.name}</span>
          <button
            type="button"
            className={[styles.checkButton, task.is_complete ? styles.complete : null].filter(Boolean).join(' ')}
            onClick={() =>
              updateDay({
                date: day.date,
                tasks: day.tasks.map((t) => (task.id === t.id ? { ...task, is_complete: !task.is_complete } : t)),
              })
            }
          >
            {task.is_complete && <Check />}
          </button>
        </div>
      ))}
    </div>
  )
}

export default CheckTaskList
