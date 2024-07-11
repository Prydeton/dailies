export type Task = {
  id: string
  user_id: string
  name: string
  is_complete: boolean
  date: string
  order: number
}

export type Day = {
  date: string
  tasks: Task[]
}
export type Month = {
  days: Day[]
}
