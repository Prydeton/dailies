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

const patch = async <S extends z.Schema>(url: string, schema: S, input: unknown, access_token: string): Promise<ReturnType<S['parse']>> => {
  const res = await fetch(new URL(url, env.API_URL), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(input),
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

type UpdateTaskInput = Omit<typeof Task['_type'], 'user_id'>;
const UpdateTaskResponse = Task

type UpdateDayInput = {
  tasks: Omit<UpdateTaskInput, 'date'>
  date: string,
}
const UpdateDayResponse = z.object({
  tasks: z.array(Task),
  date: z.string(),
})

export const Calendar = z.record(z.string(), z.array(Task))
export type Calendar = z.infer<typeof Calendar>

export const getCalendarApi = (access_token: string) => get('/calendar', Calendar, access_token)
export const updateTaskApi = (access_token: string, task: UpdateTaskInput) => patch('/task', UpdateTaskResponse, task, access_token)
export const updateDayApi = (access_token: string, day: UpdateDayInput) => patch('/day', UpdateDayResponse, day, access_token)
