import { BaseResponse } from 'common/types'
import { instance } from 'common/instance'
import { GetTasksResponse, Task, UpdateTaskModel } from './tasksApi.types'

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  deleteTask(payload: { todolistId: string; id: string }) {
    const { todolistId, id } = payload
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${id}`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: Task }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(payload: { todolistId: string; id: string; model: UpdateTaskModel }) {
    const { todolistId, id, model } = payload
    return instance.put<BaseResponse<{ item: Task }>>(`todo-lists/${todolistId}/tasks/${id}`, model)
  },
}
