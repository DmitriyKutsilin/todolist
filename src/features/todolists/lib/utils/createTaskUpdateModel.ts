import { TaskDomainType } from 'features/todolists/api/tasksApi'
import { UpdateTaskModel } from 'features/todolists/api/tasksApi.types'

export const createUpdatedModel = (task: TaskDomainType, updateValues: Partial<UpdateTaskModel>): UpdateTaskModel => {
  return {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    ...updateValues,
  }
}
