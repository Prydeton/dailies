import { DndContext, DragOverlay, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'
import { type Dispatch, Fragment, type SetStateAction, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { useUpdateDay } from '/src/hooks'
import { Button } from '..'
import type { Day } from '../../types'
import styles from './EditTaskList.module.css'

interface Task {
  id: string
  user_id: string
  name: string
  is_complete: boolean
  date: string
  order: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface InputItemProps {
  task: Task
  style?: React.CSSProperties
  active?: boolean
  sortableProps?: ReturnType<typeof useSortable>
  onChange?: (name: string) => void
  onRemove?: () => void
}

export const InputItem = ({ onChange, onRemove, active, sortableProps, style, task }: InputItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = sortableProps ?? {}

  return (
    <div
      className={styles.row}
      ref={setNodeRef}
      style={{
        ...(transform && {
          transform: CSS.Transform.toString(transform),
          transition,
        }),
        ...style,
      }}
    >
      <DragHandle
        {...attributes}
        {...listeners}
        active={active}
        onPointerDown={(e) => {
          listeners?.onPointerDown(e)
          e.stopPropagation()
        }}
      />

      <input className={styles.textInput} value={task.name} onChange={(e) => onChange?.(e.target.value)} />

      <Button transparent onClick={onRemove}>
        <Trash2 />
      </Button>
    </div>
  )
}

const Sortable = (props: InputItemProps) => {
  const sortableProps = useSortable({ id: props.task.id })
  return <InputItem sortableProps={sortableProps} {...props} />
}

interface EditTaskListProps {
  day: Day
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

const EditTaskList = ({ day: { date, tasks }, setIsEditing }: EditTaskListProps) => {
  const { mutate: updateDay } = useUpdateDay()

  interface DefaultValues {
    tasks: Task[]
  }

  const defaultValues: DefaultValues = {
    tasks: [],
  }

  const { handleSubmit, reset, control } = useForm<DefaultValues>({
    defaultValues,
  })

  useEffect(() => {
    reset({ tasks })
  }, [tasks])

  const onSaveClicked: SubmitHandler<DefaultValues> = async ({ tasks }: DefaultValues) => {
    const cleanedTasks = tasks
      .filter((task) => task.name !== '')
      .map((task, index) => ({ ...task, order: index }))
      .sort((a, b) => a.order - b.order)

    if (cleanedTasks.length === 0) return
    updateDay({ date: date, tasks: cleanedTasks })

    reset({ tasks: cleanedTasks })
    setIsEditing(false)
  }

  const [active, setActive] = useState<InputItemProps | undefined>()

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSaveClicked)}>
      <Controller
        control={control}
        name="tasks"
        render={({ field: { onChange, value } }) => (
          <div>
            <DndContext
              sensors={useSensors(useSensor(PointerSensor))}
              collisionDetection={closestCenter}
              onDragStart={({ active }) => {
                const activeTask = value.find((q) => q.id === active.id)
                return setActive(activeTask ? { task: activeTask } : undefined)
              }}
              onDragEnd={({ active, over }) => {
                setActive(undefined)

                if (!over || active.id === over.id) return
                const oldIndex = value.findIndex(({ id }) => id === active.id)
                const newIndex = value.findIndex(({ id }) => id === over.id)
                const newArray = arrayMove(value, oldIndex, newIndex)
                onChange(newArray)
              }}
            >
              <SortableContext items={value.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                <div className={styles.list}>
                  <div>
                    {useMemo(
                      () =>
                        value.map((item, i) => (
                          <Fragment key={item.id ?? i}>
                            <Sortable
                              task={item}
                              onChange={(v) => onChange(value.map((q) => (q.id === item.id ? { ...q, name: v } : q)))}
                              onRemove={() =>
                                onChange(value.length > 1 ? value.filter((q) => q.id !== item.id) : value)
                              }
                              style={active?.task.id === item.id ? { opacity: 0 } : undefined}
                            />
                          </Fragment>
                        )),
                      [value, active?.task.id],
                    )}
                  </div>
                </div>
              </SortableContext>
              {createPortal(
                <DragOverlay zIndex={5000}>{active && <InputItem task={active.task} active />}</DragOverlay>,
                document.body,
              )}
            </DndContext>

            <div className={styles.buttonContainer}>
              <Button
                onClick={() => {
                  const newTask: Task = {
                    id: crypto.randomUUID(),
                    name: '',
                    user_id: '13',
                    is_complete: false,
                    date,
                    order: value.length + 1,
                  }
                  onChange([...value, ...(value.length < 14 ? [newTask] : [])])
                }}
                disabled={value.length >= 14}
                type="button"
                secondary
              >
                Add
              </Button>
              <Button primary>Save</Button>
            </div>
          </div>
        )}
      />
    </form>
  )
}

interface DragHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
}

const DragHandle = ({ active, ...props }: DragHandleProps) => (
  <div className={styles.dragHandleWrapper} title={!active ? 'Drag to reorder' : ''} data-active={active} {...props}>
    <GripVertical />
  </div>
)

export default EditTaskList
