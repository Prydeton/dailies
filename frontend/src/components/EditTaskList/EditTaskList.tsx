import { Dispatch, Fragment, SetStateAction, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'

import { useCalendarQuery } from '/src/hooks'

import { ButtonContainer, Container, DragHandleWrapper, List, Row, TextInput } from './EditTaskList.styles'
import { Button } from '..'

interface Task {
  id: string,
  user_id: string,
  name: string,
  is_complete: boolean,
  date: string,
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

export const InputItem = ({
  onChange,
  onRemove,
  active,
  sortableProps,
  style,
  task,
}: InputItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = sortableProps ?? {}
  return <Row
    ref={setNodeRef}
    style={{
      ...transform && {
        transform: CSS.Transform.toString(transform),
        transition,
      },
      ...style,
    }}
  >
    <DragHandle {...attributes} {...listeners} active={active} />

    <TextInput
      value={task.name}
      onChange={e => onChange?.(e.target.value)}
    />

    <Button
      transparent
      onClick={onRemove}
    ><Trash2 /></Button>
  </Row>
}

const Sortable = (props: InputItemProps) => {
  const sortableProps = useSortable({ id: props.task.id })
  return <InputItem sortableProps={sortableProps} {...props} />
}

interface EditTaskListProps {
  openedDate?: string
  tasks: Task[]
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

const EditTaskList = ({ tasks, openedDate, setIsEditing }: EditTaskListProps) => {
  const { updateDay } = useCalendarQuery()

  interface DefaultValues {
    tasks: Task[]
  }

  const defaultValues: DefaultValues = {
    tasks: []
  }

  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = useForm<DefaultValues>({ defaultValues })

  useEffect(() => {
    reset({ tasks })
  }, [tasks])

  const onSaveClicked: SubmitHandler<DefaultValues> = async ({ tasks }: DefaultValues) => {
    if (!openedDate) return

    const cleanedTasks = tasks
      .filter(task => task.name !== '')
      .map((task, index) => ({ ...task, order: index }))
      .sort((a, b) => a.order - b.order)

    if (cleanedTasks.length === 0) return
    updateDay(openedDate, cleanedTasks)

    reset({ tasks: cleanedTasks })
    setIsEditing(false)
  }

  const [active, setActive] = useState<InputItemProps | undefined>()

  return (<form onSubmit={handleSubmit(onSaveClicked)}>
    <Controller
      control={control}
      name="tasks"
      render={({
        field: { onChange, value }
      }) => (
        <Container>
          <DndContext
            sensors={useSensors(
              useSensor(PointerSensor)
            )}
            collisionDetection={closestCenter}
            onDragStart={({ active }) => {
              const activeTask = value.find(q => q.id === active.id)
              return setActive(activeTask ? { task : activeTask } : undefined)
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
            <SortableContext
              items={value.map(c => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <List>
                <div>
                  {useMemo(() => value.map((item, i) => <Fragment key={item.id ?? i}>
                    <Sortable
                      task={item}
                      onChange={v => onChange(value.map(q => q.id === item.id ? { ...q, name: v } : q))}
                      onRemove={() => onChange(value.length > 1 ? value.filter(q => q.id !== item.id) : value)}
                      style={active?.task.id === item.id ? { opacity: 0 } : undefined}
                    />
                  </Fragment>), [value, active?.task.id])}
                </div>
              </List>
            </SortableContext>
            {createPortal(<DragOverlay zIndex={5000}>{active && <InputItem task={active.task} active />}</DragOverlay>, document.body)}
          </DndContext>

          <ButtonContainer>
            <Button
              onClick={() => {
                const newTask: Task = {
                  id: crypto.randomUUID(),
                  name: '',
                  user_id: '5',
                  is_complete: false,
                  date: openedDate || '',
                  order: value.length + 1
                }
                onChange([...value, ...(value.length < 14) ? [newTask] : []])
              }}
              disabled={value.length >= 10}
              type="button"
              secondary
            >Add</Button>
            <Button
              disabled={!isDirty}
              primary
            >Save</Button>
          </ButtonContainer>
        </Container>
      )}
    />
  </form>)
}

interface DragHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
}

const DragHandle: React.FC<DragHandleProps> = ({ active, ...props }) => <DragHandleWrapper
  title={!active ? 'Drag to reorder' : ''}
  data-active={active}
  {...props}
><GripVertical /></DragHandleWrapper>

export default EditTaskList
