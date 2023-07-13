import { create } from 'zustand'

import { Calendar, getCalendarApi, Task, updateDayApi, updateTaskApi } from '/src/config/api'

import { useAuthStore } from '.'

interface CalendarStore {
  calendar: Calendar | null;
  loading: boolean;
  getCalendar: () => void;
  updateTask: (task: Task) => void;
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

  updateTask: (task: Task) => {
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

    const { user_id, ...updateTask } = task
    updateTaskApi(session.access_token, updateTask)
  },

  updateDay: (date: string, tasks: Task[]) => {
    const { session } = useAuthStore.getState()
    if (!session) return console.warn('Session is not set')

    set(state => {
      if (state.calendar === null) return state
      return {
        calendar: {
          ...state.calendar,
          [tasks[0].date]: tasks,
        },
      }
    })

    const updateDay = {
      date,
      tasks: tasks.map(task => {
        const { user_id, date, order, ...cleanedTask } = task
        return cleanedTask
      })
    }

    updateDayApi(session.access_token, updateDay)
  },
}))

export default useCalendarStore

