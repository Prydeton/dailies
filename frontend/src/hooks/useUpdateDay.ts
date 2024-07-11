import type { Session } from '@supabase/supabase-js'
import { useMutation } from '@tanstack/react-query'
import { axios } from '../libs'
import type { Day } from '../types'
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

  return useMutation({
    mutationFn: (day: Day) => updateDay({ day, session }),
  })
}

export default useUpdateDay
