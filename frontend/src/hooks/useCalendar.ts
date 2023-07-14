import { create } from 'zustand'

import { Calendar, getCalendarApi, Task, updateDayApi } from '/src/config/api'

import { useAuthStore } from '.'

interface CalendarStore {
  calendar: Calendar | null;
  loading: boolean;
  getCalendar: () => void;
  updateDay: (date: string, newTasks: Task[]) => void;
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

  updateDay: (date: string, tasks: Task[]) => {
    const { session } = useAuthStore.getState()
    if (!session) return console.warn('Session is not set')

    set(state => {
      if (state.calendar === null) return state
      return {
        calendar: {
          ...state.calendar,
          [date]: tasks,
        },
      }
    })

    const updateDay = {
      date,
      tasks: tasks.map(task => {
        const { user_id, date, ...cleanedTask } = task
        return cleanedTask
      })
    }

    updateDayApi(session.access_token, updateDay)
  },
}))

export default useCalendarStore

