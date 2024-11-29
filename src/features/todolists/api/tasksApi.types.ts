import { TaskPriorities, TaskStatuses } from 'common/enums'

export type Task = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type UpdateTaskModel = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}
export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: Task[]
}
export type UpdateTaskDomainModel = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
