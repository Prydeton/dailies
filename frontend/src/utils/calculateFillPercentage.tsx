import type { Task } from '../types'

const calculateFillPercentage = (tasks: Task[]) => {
  if (tasks.length === 0) return 0
  const completedTasks = tasks.filter((task) => task.is_complete)
  return completedTasks.length / tasks.length
}

export default calculateFillPercentage
