import { z } from 'zod'

import { env } from '.'

const get = async <S extends z.Schema>(url: string, schema: S, bearer_token: string): Promise<ReturnType<S['parse']>> => {
  const res = await fetch(new URL(url, env.API_URL), {
    headers: {
      Authorization: `Bearer ${bearer_token}`,
    },
  })
    .catch(console.warn)

  if (!res?.ok) throw res
  return schema.parse(await res.json())
}

export const Task = z.object({
  id: z.string(),
  user_id: z.string(),
  name: z.string(),
  is_complete: z.boolean(),
  date: z.string(),
  order: z.number(),
})
export type Task = z.infer<typeof Task>

export const CalendarResponse = z.object({
  _value: z.array(Task),
})
export type CalendarResponse = z.infer<typeof CalendarResponse>

export const getCalendar = (bearer_token: string) => get('/calendar', CalendarResponse, bearer_token)
