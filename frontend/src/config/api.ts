import { z } from 'zod'

import { env } from '.'

const get = async <S extends z.Schema>(url: string, schema: S, access_token: string): Promise<ReturnType<S['parse']>> => {
  const res = await fetch(new URL(url, env.API_URL), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .catch(console.warn)

  if (!res?.ok) throw res
  return schema.parse(await res.json())
}

const patch = async <S extends z.Schema>(url: string, schema: S, access_token: string): Promise<ReturnType<S['parse']>> => {
  const res = await fetch(new URL(url, env.API_URL), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${access_token}`,
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

export const Calendar = z.record(z.string(), z.array(Task))

export type Calendar = z.infer<typeof Calendar>

export const getCalendar = (access_token: string) => get('/calendar', Calendar, access_token)
