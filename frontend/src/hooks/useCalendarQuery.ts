import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { axios } from '/src/libs'

import { useAuthStore } from './useAuth'

export const Task = z.object({
  id: z.string(),
  user_id: z.string(),
  name: z.string(),
  is_complete: z.boolean(),
  date: z.string(),
  order: z.number(),
})
export type Task = z.infer<typeof Task>

export const Calendar = z.record(z.string(), z.array(Task))
export type Calendar = z.infer<typeof Calendar>
const GetCalendarResponse = z.object({
  calendar: Calendar
})
type GetCalendarResponse = z.infer<typeof GetCalendarResponse>
const getCalendar = async (accessToken: string): Promise<Calendar> => {
  const response = await axios.get<GetCalendarResponse>('/calendar', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    },
  })
  return response.data.calendar
}

interface UpdateDayInput {
  date: string;
  tasks: Task[];
  accessToken: string;
}
const updateDay = async ({ date, tasks, accessToken }: UpdateDayInput): Promise<void> => {
  const updateDayData = {
    date,
    tasks: tasks.map(task => {
      const { user_id, date, ...cleanedTask } = task
      return cleanedTask
    }),
  }
  await axios.patch('/day', updateDayData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    },
  })
}

const useCalendarQuery = () => {
  const { session } = useAuthStore()
  const accessToken = session ? session.access_token : ''
  const queryClient = useQueryClient()

  const { data: calendar, isLoading, refetch } = useQuery<Calendar, Error>({
    queryKey: ['calendar'],
    queryFn: () => getCalendar(accessToken),
    enabled: !!accessToken
  })

  const updateDayMutation = useMutation<void, Error, UpdateDayInput>(
    updateDay,
    {
      onMutate: variables => {
        queryClient.cancelQueries(['calendar'])

        const previousCalendar = queryClient.getQueryData<Calendar>(['calendar'])
        if (previousCalendar) {
          const { date, tasks } = variables
          queryClient.setQueryData<Calendar>(['calendar'], oldData => {
            const newData = {
              ...oldData,
              [date]: tasks,
            }
            return newData
          })
        }

        return () => queryClient.setQueryData(['calendar'], previousCalendar)
      },
      onError: (error, _, rollback) => {
        console.error('Mutation failed:', error)
        if (typeof rollback === 'function') {
          rollback()
        }
      },
    }
  )

  const updateDayHandler = (date: string, tasks: Task[]) => {
    updateDayMutation.mutate({ date, tasks, accessToken })
  }

  return {
    calendar,
    loading: isLoading,
    getCalendar: refetch,
    updateDay: updateDayHandler,
  }
}

export default useCalendarQuery
