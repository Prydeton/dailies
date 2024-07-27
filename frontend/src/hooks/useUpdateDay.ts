import type { Session } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../libs'
import type { Day, Month } from '../types'
import useAuth from './useAuth'

type UpdateDayInput = {
  day: Day
  session: Session | null
}

export const updateDay = async ({ day: { date, tasks }, session }: UpdateDayInput) => {
  const updateDayData = {
    date,
    tasks: tasks.map((task) => {
      const { user_id, date, ...cleanedTask } = task
      return cleanedTask
    }),
  }
  return axios.patch('/day', updateDayData, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
      'x-timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  })
}

const useUpdateDay = () => {
  const { session } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (day: Day) => updateDay({ day, session }),
    onMutate: async (new_day: Day) => {
      const yearMonth = new_day.date.slice(0, -3)
      await queryClient.cancelQueries({ queryKey: ['months', yearMonth] })

      const oldMonth = queryClient.getQueryData<Month>(['months', yearMonth])
      if (oldMonth) {
        const days = oldMonth.days.map((day) =>
          day.date === new_day.date ? { date: day.date, tasks: new_day.tasks } : day,
        )
        queryClient.setQueryData(['months', yearMonth], { days })
      }

      return { oldMonth }
    },
    onError: (_, new_day, context) => {
      queryClient.setQueryData(['months', new_day.date.slice(0, -3)], context?.oldMonth)
    },
    onSettled: (_, __, day) => {
      queryClient.invalidateQueries({ queryKey: ['months', day.date.slice(0, -3)] })
    },
  })
}

export default useUpdateDay
