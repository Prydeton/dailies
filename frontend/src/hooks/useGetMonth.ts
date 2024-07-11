import type { Session } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'
import type { Dayjs } from 'dayjs'
import { axios } from '../libs'
import type { Month } from '../types'
import useAuth from './useAuth'

type GetMonthInput = {
  yearMonth: string
  session: Session | null
}
const getMonth = async ({ yearMonth, session }: GetMonthInput): Promise<Month> => {
  try {
    const response = await axios.get<Month>(`/month/${yearMonth}`, {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        'x-timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching month data:', error)
    throw error
  }
}

const useGetMonth = (currentPage: Dayjs) => {
  const { session } = useAuth()

  return useQuery<Month>({
    queryFn: ({ queryKey }) => getMonth({ yearMonth: queryKey[1] as string, session }),
    queryKey: ['months', currentPage.format('YYYY-MM')],
  })
}

export default useGetMonth
