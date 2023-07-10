import { create } from 'zustand'

import { Calendar, getCalendarApi, Task, updateTaskApi } from '/src/config/api'

import { useAuthStore } from '.'

interface CalendarStore {
  calendar: Calendar | null;
  loading: boolean;
  getCalendar: () => void;
  updateTask: (task: Task) => void;
  updateTasks: (newTasks: Task[]) => void;
}

const useCalendarStore = create<CalendarStore>(set => ({
  calendar: null,
  loading: false,

  getCalendar: async () => {
    const { session } = useAuthStore.getState()
    if (!session) return console.warn('Session is not set')

    set(state => ({
      ...state,
      loading: true,
    }))

    const calendar = await getCalendarApi(session.access_token)

    set(_ => ({
      calendar,
      loading: false,
    }))
  },

  updateTask: async (task: Task) => {
    const { session } = useAuthStore.getState()
    if (!session) return console.warn('Session is not set')

    set(state => {
      if (state.calendar === null) return state
      return {
        calendar: {
          ...(state.calendar || {}),
          [task.date]: (state.calendar?.[task.date] || []).map(existingTask =>
            task.id === existingTask.id ? task : existingTask
          ),
        },
      }
    })

    const {user_id, ...updateTask} = task
    await updateTaskApi(session.access_token, updateTask)
  },

  updateTasks: async (newTasks: Task[]) => {
    const { session } = useAuthStore.getState()
    if (!session) return console.warn('Session is not set')

    set(state => {
      if (state.calendar === null) return state
      return {
        calendar: {
          ...state.calendar,
          [newTasks[0].date]: newTasks,
        },
      }
    })
  },
}))

export default useCalendarStore

