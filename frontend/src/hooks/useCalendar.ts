import { create } from 'zustand'

import { Calendar, getCalendar, Task } from '/src/config/api'

import { useAuthStore } from '.'

interface CalendarStore {
  calendar: Calendar | null;
  loading: boolean;
  getCalendar: () => void;
  updateTasks: (newTasks: Task[]) => void;
  updateTaskComplete: (taskId: string, date: string, isComplete: boolean) => void;
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

    const calendar = await getCalendar(session.access_token)

    set(_ => ({
      calendar,
      loading: false,
    }))
  },

  updateTasks: (newTasks: Task[]) => {
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

  updateTaskComplete: (taskId: string, date: string, isComplete: boolean) => {
    const { session } = useAuthStore.getState()
    if (!session) return console.warn('Session is not set')

    set(state => {
      if (state.calendar === null) return state
      return {
        calendar: {
          ...(state.calendar || {}),
          [date]: (state.calendar?.[date] || []).map(task =>
            task.id === taskId ? { ...task, is_complete: isComplete } : task
          ),
        },
      }
    })
  },
}))

export default useCalendarStore

